let items = [];

class Item {
  constructor(id, name, src, price, key_word, information) {
    this.id = id;
    this.name = name;
    this.src = src;
    this.price = price;
    this.key_word = key_word;
    this.information = information;
  }
}

function fetchData() {
  return new Promise((resolve, reject) => {
    fetch("resources/menu.txt")
      .then((response) => response.json())
      .then((data) => {
        items = data.map(
          (d) =>
            new Item(d.id, d.name, d.src, d.price, d.key_word, d.information)
        );
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

createItem = function (item) {
  var newItem = document.createElement("div");
  newItem.classList.add("item");
  var firstRow = document.createElement("div");
  firstRow.classList.add("row");
  var imageDiv = document.createElement("div");
  imageDiv.classList.add("image");
  var imgeDag = document.createElement("img");
  imgeDag.src = item.src;
  imgeDag.alt = item.name;

  imageDiv.appendChild(imgeDag);
  firstRow.appendChild(imageDiv);

  newItem.appendChild(firstRow);

  var secondRow = document.createElement("div");
  secondRow.classList.add("row");

  var secondRowFirstColumn = document.createElement("div");
  secondRowFirstColumn.classList.add("column");
  var itemNameDiv = document.createElement("div");
  itemNameDiv.classList.add("item-name");

  var itemNamePTag = document.createElement("p");
  itemNamePTag.innerText = item.name;

  itemNameDiv.appendChild(itemNamePTag);
  secondRowFirstColumn.appendChild(itemNameDiv);

  var secondRowSecondColumn = document.createElement("div");
  secondRowSecondColumn.classList.add("column");

  var itemDetailsDiv = document.createElement("div");
  itemDetailsDiv.classList.add("item-details");

  var priceRow = document.createElement("div");
  priceRow.classList.add("row");

  var pricePTag = document.createElement("p");
  pricePTag.classList.add("price");
  pricePTag.innerText = "Rs. " + item.price;

  priceRow.appendChild(pricePTag);

  var buttonRow = document.createElement("div");
  buttonRow.classList.add("row");

  var addToCart = document.createElement("div");
  addToCart.classList.add("add-to-cart");

  var addToCartButton = document.createElement("button");

  var spanTag = document.createElement("span");
  spanTag.classList.add("material-symbols-outlined");
  spanTag.innerText = "shopping_cart";

  addToCartButton.appendChild(spanTag);
  addToCart.appendChild(addToCartButton);
  buttonRow.appendChild(addToCart);

  itemDetailsDiv.appendChild(priceRow);
  itemDetailsDiv.appendChild(buttonRow);

  secondRowSecondColumn.appendChild(itemDetailsDiv);

  secondRow.appendChild(secondRowFirstColumn);
  secondRow.appendChild(secondRowSecondColumn);

  newItem.appendChild(secondRow);

  var container = document.getElementById("menu-items");
  container.appendChild(newItem);
};

getSelectionResults = function () {
  var id_array = [];
  const element = document.getElementById("menu-items");
  element.innerHTML = "";
  const selectElement = document.getElementById("select_item_group");
  if (selectElement.value === "All") {
    id_array = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ];
  } else if (selectElement.value === "Main Course Dishes") {
    id_array = [1, 2, 3, 4, 5, 6, 7, 8];
  } else if (selectElement.value === "Dinner Special") {
    id_array = [9, 10, 11];
  } else if (selectElement.value === "Beverages") {
    id_array = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  } else if (selectElement.value === "Short Eats") {
    id_array = [23, 24, 25];
  } else if (selectElement.value === "Other") {
    id_array = [26, 27, 28];
  }

  setTimeout(() => {
    index = 0;
    items.forEach((i) => {
      if (id_array.includes(i.id)) {
        setTimeout(() => {
          createItem(i);
        }, 200 * index++);
      }
    });
  }, 200);
};

getSearchResults = function () {
  const element = document.getElementById("menu-items");

  const searchBar = document.getElementById("search-item");
  const selectElement = document.getElementById("select_item_group");
  selectElement.value = "All";
  const searchString = searchBar.value.toLowerCase();
  const filteredItems = items.filter((item) => {
    return item.key_word.some((keyword) =>
      keyword.toLowerCase().startsWith(searchString)
    );
  });
  setTimeout(() => {
    index = 0;
    element.innerHTML = "";
    if (filteredItems.length == 0) {
      const notFoundElement = document.createElement("div");
      notFoundElement.classList.add("search-not-found");
      notFoundElement.innerText = "No results found for your search.";
      element.appendChild(notFoundElement);
      return;
    }
    filteredItems.forEach((item) => {
      setTimeout(() => {
        createItem(item);
      }, 200 * index++);
    });
  }, 200);
};

init_menu = function () {
  const element = document.getElementById("menu-items");
  element.innerHTML = "";
  fetchData()
    .then(() => {
      setTimeout(() => {
        index = 0;
        items.forEach((i) => {
          setTimeout(() => {
            createItem(i);
          }, 200 * index++);
        });
      }, 200);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

init_menu();

enabaleButton = function () {
  var search_button = document.getElementById("search_button");
  var search_bar = document.getElementById("search-item");

  if (search_bar.value !== "") {
    search_button.disabled = false;
    search_button.classList.add("button-enable");
  } else {
    search_button.disabled = true;
    init_menu();
    search_button.classList.remove("button-enable");
  }
};