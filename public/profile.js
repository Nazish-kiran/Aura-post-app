import { auth, signOut, onAuthStateChanged } from "./firebase.js";

const logOutBtn = document.querySelector(".logOut-btn");
const changeNameBtn = document.querySelector(".chnage-name-btn");
const displayNew = document.querySelector(".dp-name-new");

const userLocal = JSON.parse(localStorage.getItem("userl"));

onAuthStateChanged(auth, (user | userLocal|) => {
  if (user) {
    const profilePictures = document.querySelectorAll(".profile-pict");
    const displayName = document.querySelector(".dp-name-p");

    if (displayName) {
      displayName.value = userLocal.displayName || "Anonymous";
    }

    if (profilePictures) {
      profilePictures.forEach((img) => {
        img.src = user.photoURL || "default-pic.jpg";
      });
    }
  } else {
    window.location.href = "https://aura-posting-web.web.app";
  }
});

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

if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
} else {
  console.error("Logout button not found in the DOM.");
}
const changeName = () => {
  let newName = displayNew.value;

  if (newName.trim() === "") {
    alert("Name cannot be empty.");
    return;
  }
  const userLocal = JSON.parse(localStorage.getItem("userl"));
  if (userLocal) {
    userLocal.name = newName;
    localStorage.setItem("userl", JSON.stringify(userLocal));
    console.log("Name updated in local storage:", newName);

    // document.querySelectorAll(".profile-name").forEach((el) => {
    //   el.textContent = newName;
    // });
  } else {
    console.error("User not found in local storage.");
  }
};

changeNameBtn.addEventListener("click", changeName);
