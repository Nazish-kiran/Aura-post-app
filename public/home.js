import { auth, onAuthStateChanged } from "./firebase.js";
const userLocal  = JSON.parse(localStorage.getItem("userl"))
console.log(userLocal);


onAuthStateChanged(auth , (user)=> {
    console.log(user);
    
  if (userLocal || user) {
    const profilePicture = document.querySelector(".profile-pict");
    const displayName = document.querySelector(".dp-name-p");
    displayName.innerHTML = userLocal.name || "Anonymous"; 
    profilePicture.src = user.photoURL || "default-pic.jpg";
  } else {   
    window.location.href = "https://aura-posting-web.web.app";
  }
});
