import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider ,
  provider,
  signInWithPopup
} from "./firebase.js";

const submittBtn = document.querySelector(".btn1");
const signBtn = document.querySelector(".btn2");
const googleBtn = document.querySelector(".btn3");
const useremail = document.querySelector(".email");
const userpassword = document.querySelector(".password");
const signEmail = document.querySelector(".email2");
const signPassword = document.querySelector(".pass2");
const confirmPassword = document.querySelector(".pass3");

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
  }
  else{
  alert("passwords dont match")
  }
   
};
const signInUser = (e) => {

  let email = useremail.value;
  let password = userpassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("exist");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
const googleUser =(e)=>{
  console.log("Google Sign-In Button Clicked");
  e.preventDefault()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

submittBtn.addEventListener("click", signInUser);
signBtn.addEventListener("click", createUser);
googleBtn.addEventListener("click", googleUser);

