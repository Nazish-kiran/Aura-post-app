import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth , (user)=> {
    console.log(user);
    
  if (user) {
    const profilePicture = document.querySelector(".profile-pict");
    const displayName = document.querySelector(".dp-name-p");
    displayName.innerHTML = user.displayName || "Anonymous"; 
    profilePicture.src = user.photoURL || "default-pic.jpg";
  } else {   
    window.location.href = " https://aura-posting-web.web.app";
  }
});
