import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
  onAuthStateChanged,
} from "./firebase.js";

const submittBtn = document.querySelector(".btn1");
const signBtn = document.querySelector(".btn2");
const googleBtn = document.querySelector(".btn3");
const useremail = document.querySelector(".email");
const userpassword = document.querySelector(".password");
const signEmail = document.querySelector(".email2");
const signPassword = document.querySelector(".pass2");
const confirmPassword = document.querySelector(".pass3");

const changedUrl = () => {
  window.location.replace("https://aura-posting-web.web.app/home.html");
  console.log("done");
};
const createUser = (e) => {
  let email = signEmail.value;
  let password = signPassword.value;
  let confPassword = confirmPassword.value;
  if (password == confPassword) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    alert("passwords dont match");
  }
};
const signInUser = (e) => {
  let email = useremail.value;
  let password = userpassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      console.log("exist");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, id: user.uid })
      );
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  setTimeout(changedUrl, 2000);
};
const googleUser = (e) => {
  console.log("Google Sign-In Button Clicked");
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          id: user.uid,
          name: user.displayName,
          picture: user.photoURL,
        })
      );
      console.log(user);

      setTimeout(changedUrl, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
submittBtn.addEventListener("click", signInUser);
signBtn.addEventListener("click", createUser);
googleBtn.addEventListener("click", googleUser);
onAuthStateChanged(auth, (user) => {
  if (user) {
    setTimeout(changedUrl, 2000);
    const uid = user.uid;
  } else {   
  }
});




export { auth, onAuthStateChanged };
