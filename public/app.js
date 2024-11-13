import {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase.js";

const submittBtn = document.querySelector(".btn1");
const signBtn = document.querySelector(".btn2");
const useremail = document.querySelector(".email");
const userpassword = document.querySelector(".password");
const signEmail = document.querySelector(".email2");
const signPassword = document.querySelector(".pass2");

const createUser = (e) => {
  let email = signEmail.value;
  let password = signPassword.value;

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

submittBtn.addEventListener("click", signInUser);
signBtn.addEventListener("click", createUser);
