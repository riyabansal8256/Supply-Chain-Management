var express = require('express');
var app = express();
var session = require('express-session');
var con = require('./connection');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var flash = require('connect-flash');
// convert it into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('SecretStringForCookie'))


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: false,
      expires:false
  }
  }));
app.use(flash());
app.set("view engine", "ejs");

app.use(express.static('./public'))

app.get('/', function (req, res) {
    res.render("signup",{message:""})
})

app.post('/', function (req, res) {
    var FirstName = req.body.FName;
    var LastName = req.body.LName;
    var Email = req.body.email;
    var Phone = req.body.number;
    var Password = req.body.password;

    con.connect(function (error) {
        if (error) throw error;
        var sql1 = "SELECT Email FROM customers WHERE Email=?";

        con.query(sql1, [Email], function (error, result) {
            if (error) throw error;

            if (result.length > 0) {
                return res.render("signup", { message:"Already have a account" });
            } else {
                var sql2 = "INSERT INTO customers (FirstName, LastName, Email, Phone, Password) VALUES ?";
                var values = [
                    [FirstName, LastName, Email, Phone, Password]
                ];

                con.query(sql2, [values], function (error, result) {
                    if (error) throw error;
                    res.redirect('/login');
                });
            }
        });
    });
});
app.get('/login', function (req, res) {
    res.render("login",{message:""})
})

app.post('/login', function (req, res) {

    var Email = req.body.email;
    var Password = req.body.password;

    con.connect(function (error) {
        if (error) throw error;
        var sql = 'SELECT * FROM customers WHERE Email = ? AND Password = ?';

        con.query(sql, [Email, Password], function (error, result) {
            if (error) throw error;
            if (result.length > 0) {
                var sql2 = "INSERT INTO users (Email,Password) VALUES ?";
                var values = [[Email, Password]];
                con.query(sql2, [values], function (error, result2) {
                    if (error) throw error;
                    res.render("FurnitureX");
                });
            } else {
                return res.render("login", { message: "Dont match with our database" });
            }
        })
    })
});


app.get('/FurnitureX', function (req, res) {
    res.render("FurnitureX")
})
app.get('/products', function (req, res) {
    res.render("all")
})
app.get('/sofa', function (req, res) {
    res.render("sofa")
})
app.get('/chair', function (req, res) {
    res.render("chair")
})
app.get('/tables', function (req, res) {
    res.render("tables")
})
app.get('/account', function (req, res) {
    con.connect(function (error) {
        if (error) {
            console.error("Database connection error:", error);
            return res.status(500).send("Internal Server Error");
        }

        var sql = 'SELECT * FROM customers as c JOIN users as u ON u.Email=c.Email';
        con.query(sql, function (error, result) {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Internal Server Error");
            }

            if (result.length > 0) {
                var customerID = result[0].CustomerID;

                var sql2 = 'SELECT * FROM products WHERE ProductID IN (SELECT ProductID FROM orderdetails WHERE OrderID IN (SELECT OrderID FROM orders WHERE CustomerID = ?))';
                con.query(sql2, [customerID], function (error, result2) {
                    if (error) {
                        console.error("Error executing query:", error);
                        return res.status(500).send("Internal Server Error");
                    }

                    var sql3 = 'SELECT OrderDate, DeliveryDate FROM orders WHERE CustomerID = ?';
                    con.query(sql3, [customerID], function (error, result3) {
                        if (error) {
                            console.error("Error executing query:", error);
                            return res.status(500).send("Internal Server Error");
                        }

                        return res.render("account", { result: result, result2: result2, result3: result3 });
                    });
                });
            } else {
                // Handle the case when no customer is found
                return res.render("account", { result: null, result2: null, result3: null });
            }
        });
    });
});

app.get('/delete', function (req, res) {
    con.connect(function (error) {
        if (error) throw error;
        var sql = 'DELETE from users';
        con.query(sql, function (error, result) {
            if (error) throw error;
            res.render("signup")
        })
    })
})

app.get('/buy', function (req, res) {
    // this is a session to access the product id to different route 
    const productId = req.query.product;
    req.session.pid = productId;
    console.log(req.session.pid)
    console.log(productId)
        con.connect(function (error) {
        if (error) throw error;
        var sql = 'SELECT * FROM customers as c join users as u on u.Email=c.Email';
        con.query(sql, function (error, result) {
            if (error) throw error;
            return res.render("buy", { res: result });
        })
    })
})

app.get('/review',function(req,res){
    return res.render("review");
})
// // app.get('/review', function (req, res) {
// //     var status='ordered';
// //     var Street = req.body.street;
// //     var town = req.body.town;
// //     var state = req.body.state;
// //     var pin = req.body.pin;
// //     console.log(req.session.pid);
// //     console.log('successfully enter');
// //     con.connect(function (error) {
// //         if (error) throw error;
// //         var sql1 = 'SELECT * FROM customers as c join users as u on u.Email=c.Email';
// //         con.query(sql1, function (error, cus) {
// //             if (error) throw error;
// //             console.log('successfully run sql 1');
// //             if (cus.length > 0) {
// //                 var customerID = cus[0].customerID; // Assuming customerID is the correct column name
// //                 if (Street === undefined || Street === null) {
// //                     return res.status(400).send("Street value is missing or invalid");
// //                 }
// //                 var sql2 = "INSERT INTO addresses (customerID, Street, City, State, pinCode) VALUES ?";
// //                 var values2 = [
// //                     [customerID, Street, town, state, pin]
// //                 ];

// //                 con.query(sql2, [values2], function (error, result) {
// //                     if (error) throw error;
// //                     console.log('successfully run sql 2');
// //                     var sql3 = "UPDATE products SET StockQuantity=StockQuantity-1 WHERE ProductID=?";
// //                     con.query(sql3, [id], function (error, result) {
// //                         if (error) throw error;

// //                         return res.render("review", { res: result, ID: req.session.pid });
// //                     });
// //                 });
// //             }
             
// //         })
// //     })
//     
// // })



app.get('/sub', function (req, res) {  
   var {rating,review}=JSON.parse(req.body);
   console.log(req.body);
   con.connect(function (error) {
    if (error) throw error;
    var sql = 'SELECT * FROM customers as c join users as u on u.Email=c.Email';
    con.query(sql, function (error, result) {
        if (error) throw error;
        return res.render("account", { account: result });
    })
}) 
    res.render("FurnitureX")
})
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});