// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJZbKFfszv9mWpzaKiXg_mMeUxhD8UPZE",
  authDomain: "farmse-2cd34.firebaseapp.com",
  databaseURL: "https://farmse-2cd34-default-rtdb.firebaseio.com",
  projectId: "farmse-2cd34",
  storageBucket: "farmse-2cd34.appspot.com",
  messagingSenderId: "1008873211370",
  appId: "1:1008873211370:web:bd24b946ee500354e21e93",
  measurementId: "G-3CWS4Y21RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const db = getDatabase(app);

// Function to handle login
document.getElementById("loginBtn").addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
        const farmerRef = ref(db, 'FarmerReg/' + username);
        const snapshot = await get(farmerRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const storedPassword = userData.password; // Retrieve stored password

            // Compare stored password with provided password (consider hashing in real-world scenarios)
            if (password === storedPassword) {
                // Login successful
                alert("Login successful!");
                // Store the username in localStorage
                localStorage.setItem("username", username);
                // Redirect to Farmhome.html
                window.location.href = "Farmhome.html";
            } else {
                // Incorrect password
                alert("Incorrect password!");
            }
        } else {
            // User does not exist
            alert("User does not exist!");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check the console for details.");
    }
});
