// Import the Firebase SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, update, remove, onValue, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJZbKFfszv9mWpzaKiXg_mMeUxhD8UPZE",
  authDomain: "farmse-2cd34.firebaseapp.com",
  projectId: "farmse-2cd34",
  storageBucket: "farmse-2cd34.appspot.com",
  messagingSenderId: "1008873211370",
  appId: "1:1008873211370:web:bd24b946ee500354e21e93",
  measurementId: "G-3CWS4Y21RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Assume the username is stored in localStorage
const uname = localStorage.getItem("username");

// Reference to the user's `FarmReg` node and `products` sub-node
const userFarmRegRef = ref(database, `FarmReg/${uname}`);
const productsRef = ref(database, `FarmReg/${uname}/products`);

// DOM Elements
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productDescInput = document.getElementById("productDesc");
const productImageInput = document.getElementById("productImage");
const humidityInput = document.getElementById("humidity");
const productIdInput = document.getElementById("productId");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const productDisplay = document.getElementById("productDisplay");

// Function to ensure the `products` key exists
function initializeProductsKey() {
  get(productsRef).then((snapshot) => {
    if (!snapshot.exists()) {
      // If `products` key does not exist, initialize it as an empty object
      set(productsRef, {}).catch((error) => {
        console.error("Error initializing products key: ", error);
      });
    }
  }).catch((error) => {
    console.error("Error checking products key: ", error);
  });
}

// Function to add or update a product
function saveProduct(productId) {
  const productData = {
    name: productNameInput.value,
    price: productPriceInput.value,
    description: productDescInput.value,
    humidity: humidityInput.value,
    // For image upload, you'd need to handle file upload separately
  };

  if (productId) {
    // Update existing product
    update(ref(database, `FarmReg/${uname}/products/${productId}`), productData)
      .then(() => {
        alert("Product updated successfully!");
        document.getElementById("productForm").reset();
        formSubmitBtn.innerText = "Add Crop";
        document.getElementById("formTitle").innerText = "Add New Crop";
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
      });
  } else {
    // Add new product
    const newProductRef = push(productsRef);
    set(newProductRef, productData)
      .then(() => {
        alert("Product added successfully!");
        document.getElementById("productForm").reset();
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      });
  }
}

// Function to load and display products
function loadProducts() {
  onValue(productsRef, (snapshot) => {
    const products = snapshot.val();
    productDisplay.innerHTML = '';  // Clear current products

    if (products) {
      for (let key in products) {
        const product = products[key];
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <h3>${product.name}</h3>
          <p>Price: ${product.price} INR</p>
          <p>${product.description}</p>
          <p>Humidity: ${product.humidity}%</p>
          <button class="edit-btn" onclick="editProduct('${key}')">Edit</button>
          <button class="delete-btn" onclick="deleteProduct('${key}')">Delete</button>
        `;
        productDisplay.appendChild(productCard);
      }
    }
  });
}

// Function to edit a product
window.editProduct = function(productId) {
  const productRef = ref(database, `FarmReg/${uname}/products/${productId}`);
  get(productRef).then((snapshot) => {
    const product = snapshot.val();
    
    // Fill form with existing product data
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productDescInput.value = product.description;
    humidityInput.value = product.humidity;
    productIdInput.value = productId;

    // Change form button text to "Update Crop"
    formSubmitBtn.innerText = "Update Crop";
    document.getElementById("formTitle").innerText = "Edit Crop";
  });
};

// Function to delete a product
window.deleteProduct = function(productId) {
  remove(ref(database, `FarmReg/${uname}/products/${productId}`))
    .then(() => {
      alert("Product deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting product: ", error);
    });
};

// Handle form submission
document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const productId = productIdInput.value;
  saveProduct(productId);
});

// Initialize the products key and load products on page load
initializeProductsKey();
window.onload = loadProducts;
