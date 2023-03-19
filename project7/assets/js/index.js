//homepage


const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE1ZDIwYzE3N2Y3MDAwMTNjNWViNGIiLCJpYXQiOjE2NzkxNTE2MjgsImV4cCI6MTY4MDM2MTIyOH0.ggSlAwyxq9SYRrsrZvyB9o0xopnCFGeEm5vUM2wkHkE";

let searchBar = document.querySelector("form input");
let rowRef = document.querySelector("main .row");
let searchBtn = document.querySelector(".btn-outline-success");

//new card
const printProducts = function (prod) {
  let newCard = `<div class="col-md-4">
      <div class="card mb-4 shadow-sm">
      <img src="${prod.imageUrl}" alt="${prod.name} image">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${prod.name}</h5>
          <p class="card-text">
            Brand: ${prod.brand}<br>
            Model:${prod.name}<br>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a href="./details.html?productId=${prod._id}" class="btn btn-sm btn-outline-secondary">View details</a>
              <a href="./backoffice.html?productId=${prod._id}"class="btn btn-sm btn-outline-secondary">Edit</a>
            </div>
          </div>
          <small class="text-muted mt-3">Pruduct ID: ${prod._id}</small>
        </div>
      </div>
    </div>`;
  rowRef.innerHTML += newCard;
};

let getProducts = async function () {
  try {
    let response = await fetch(API_URL, {
      method: "GET",                                      //metodo get
      headers: {
        Authorization: TOKEN,
      },
    });
    if (response.ok) {
      let products = await response.json();
      console.log(rowRef);
      console.log(products);
      rowRef.innerHTML = " ";
      products.forEach((prod) => {
        printProducts(prod);
      });
    } else {
      return new Error("Errore di caricamento dei prodotti"); //error
    }
  } catch (error) {}
};

getProducts();

let postProducts = async function (_productName, _productDescription, _productBrand, _productImg, _productPrice) {
  try {
    let newProduct = {
      name: _productName,
      description: _productDescription,
      brand: _productBrand,
      imageUrl: _productImg,
      price: _productPrice,
    };

    let response = await fetch(API_URL, {
      method: "POST",                                  //metodo post
      body: JSON.stringify(newProduct),
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Prodotto aggiunto correttamente");
    } else {
      return new Error("Errore di inserimento del prodotto");                      //error
    }
  } catch (error) {}
};

const search = function () {
  let cards = document.querySelectorAll(".col-md-4");
  let searchQuery = document.querySelector("nav form");
  cards.forEach((card) => {
    console.log(card.innerText.includes(searchQuery.value)); //.include(searchQuery.value)
  });
};

function myFunction() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.querySelector("nav form");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
