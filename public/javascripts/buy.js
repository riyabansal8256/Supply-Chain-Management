document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch product details based on ID
  function getProductDetails(productId) {
    switch (productId) {
        case '1':
            return { id: 1, pic: "img/armchair.jpg", name: 'Armchair', desc: 'Armchair with Head Rester', price: 950 };
        case '2':
            return { id: 2, pic: "img/table.jpg", name: 'Stool', desc: 'Classic Wooden Table', price: 850 };
        case '3':
            return { id: 3, pic: "img/office-table.jpg", name: 'Computer table', desc: 'Computer Table with Office Chair', price: 7500 };
        case '4':
            return { id: 4, pic: "img/study-table.jpg", name: 'Computer table', desc: 'Desktop Table with Drawers', price: 6000 };
        case '5':
            return { id: 5, pic: "img/dining-table.jpg", name: 'Table', desc: 'Classic Wooden Table', price: 1500 };
        case '6':
            return { id: 6, pic: "img/chair3.jpg", name: 'Chair', desc: 'Fancy Single Chair', price: 550 };
        case '7':
            return { id: 7, pic: "img/round-sofa.jpg", name: 'Sofa', desc: 'Modern White Round Sofa', price: 4500 };
        case '8':
            return { id: 8, pic: "img/safa-2.jpg", name: 'Sofa', desc: 'Sofa Chairs with Cushions', price: 3000 };
        case '9':
            return { id: 9, pic: "img/wooden-study-table.jpg", name: 'Study Table', desc: 'Study Table', price: 2500 };
        case '10':
            return { id: 10, pic: "img/chair.jpg", name: 'Chair', desc: 'Vintage Luxury Chair', price: 1290 };
        case '11':
            return { id: 11, pic: "img/sofa.jpg", name: 'Sofa', desc: 'Beige Living Room Sofa', price: 2000 };
        case '12':
            return { id: 12, pic: "img/desk-table.jpg", name: 'Study table', desc: 'Corner Study Table with Chair', price: 900 };
        case '13':
            return { id: 13, pic: "img/fancy-chair.jpg", name: 'Sofa', desc: 'Fancy Chairs', price: 1200 };
        case '14':
            return { id: 14, pic: "img/chair-leg-rest.jpg", name: 'Chair', desc: 'Orange Recliner with Leg Rest', price: 750 };
        case '15':
            return { id: 15, pic: "img/round-stool.jpg", name: 'Chair', desc: 'Round Short Leg Stool/Chair', price: 300 };
        case '16':
            return { id: 16, pic: "img/chair-1.jpg", name: 'Sofa', desc: 'Sofa Chairs with Red Cushions', price: 550 };
        case '17':
            return { id: 17, pic: "img/couch.jpg", name: 'Chair', desc: 'Wingback Yellow Couch', price: 650 };
        case '18':
            return { id: 18, pic: "img/rocking-chair.jpg", name: 'Armchair', desc: 'Wooden Rocking Chair', price: 300 };
        default:
            // Default case: Product not found
            return null;
    }
}


  let urlString = window.location.href;
  let paramString = urlString.split('?')[1];
  let queryString = new URLSearchParams(paramString);
  let productId = queryString.get("product");
  console.log(productId);

  // Fetch product details based on the product ID
  let product = getProductDetails(productId);

  if (product) {
      // If product details are found, update the order box
      var orderbox = document.querySelector("#order-img");
      orderbox.innerHTML = ` <div class="box" id="product${product.id}">
          <div class="img-a">
            <div class="img-a2">
              <img src=${product.pic} alt="" />
            </div>
          </div>
          <div class="name">
            <p>${product.name}</p>
          </div>
          <div class="work">
            <p>${product.desc}</p>
          </div>
          <div class="price">
            <p>₹${product.price}</p>
          </div>
        </div>`;
  } else {
      // Product not found, handle accordingly
      console.error("Product not found");
  }
});
