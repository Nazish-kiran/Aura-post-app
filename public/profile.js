// Import Firebase functions
import { auth, signOut, onAuthStateChanged } from "./firebase.js";

// DOM Elements
const logOutBtn = document.querySelector(".logOut-btn");
const changeNameBtn = document.querySelector(".chnage-name-btn");
const displayNew = document.querySelector(".dp-name-new");
const profilePictures = document.querySelectorAll(".profile-pict");

// Get the user object from localStorage
const userLocal = JSON.parse(localStorage.getItem("userl")) || {};

// Initialize the input field with the stored name on page load
window.addEventListener("load", () => {
  if (userLocal.name) {
    displayNew.value = userLocal.name; // Set input field to stored name
  } else {
    displayNew.value = ""; // Default to empty if no name exists
  }
});
// Chnage profile pic

onAuthStateChanged(auth, (user) => {
  if (user || userLocal) {
    if (profilePictures) {
      profilePictures.forEach((img) => {
        img.src = user.photoURL || "default-pic.jpg";
      });
    }
  } else {
    window.location.href = "https://aura-posting-web.web.app";
  }
});
// Function to change and save the name
const changeName = () => {
  let newName = displayNew.value.trim(); // Get the input value

  if (newName === "") {
    alert("Name cannot be empty.");
    return;
  }

  // Update the name in localStorage
  userLocal.name = newName;
  localStorage.setItem("userl", JSON.stringify(userLocal));

  console.log("Name updated:", newName);
};

// Add click event listener to the Change Name button
if (changeNameBtn) {
  changeNameBtn.addEventListener("click", changeName);
}

// Logout function
const logOut = () => {
  localStorage.clear();
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
      window.location.href = "https://aura-posting-web.web.app";
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
};

// Add click event listener to the Logout button
if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
} else {
  console.error("Logout button not found in the DOM.");
}
