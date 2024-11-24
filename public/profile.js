import { auth, signOut, onAuthStateChanged } from "./firebase.js";

const logOutBtn = document.querySelector(".logOut-btn");

const logOut= ()=>{
localStorage.clear()
signOut(auth)
.then(() => {
    console.log("User logged out successfully");
    // Redirect to the main page or login page
    window.location.replace("index.html");
    // window.location.href = "https://aura-posting-web.web.app";
    })
    .catch((error) => {
      console.error("Error during logout:", error.message);
    });
}

logOutBtn.addEventListener("click",logOut)