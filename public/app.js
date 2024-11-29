import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "./firebase.js";

const toast = document.getElementById("snackbar");

// Function to show a toast message
const showToast = (message) => {
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
};

// Function to save data to localStorage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to retrieve data from localStorage
const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Function to change the URL (or navigate)
const changedUrl = () => {
  console.log("Navigation triggered");
  // Uncomment the next line for actual navigation
  window.location.replace("https://aura-posting-web.web.app/home.html");
};

// Function to handle user registration
const createUser = async () => {
  const email = document.querySelector(".email2").value;
  const password = document.querySelector(".pass2").value;
  const confirmPassword = document.querySelector(".pass3").value;

  if (password !== confirmPassword) {
    showToast("Passwords don't match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user to localStorage
    saveToLocalStorage("user", { email: user.email, id: user.uid });

    console.log(user);
    showToast("User created successfully!");

    // Redirect to new URL
    setTimeout(changedUrl, 2000);
  } catch (error) {
    showToast(error.message);
  }
};

// Function to handle user login
const signInUser = async () => {
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user to localStorage
    saveToLocalStorage("user", { email: user.email, id: user.uid });

    console.log(user);
    showToast("Signed in successfully!");

    // Redirect to new URL
    setTimeout(changedUrl, 2000);
  } catch (error) {
    showToast(error.message);
  }
};

// Function to handle Google Sign-In
const googleUser = async (e) => {
  e.preventDefault();
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    // Save user to localStorage
    saveToLocalStorage("user", {
      email: user.email,
      id: user.uid,
      name: user.displayName,
      picture: user.photoURL,
    });

    console.log(user);
    showToast("Google Sign-In successful!");

    // Redirect to new URL
    setTimeout(changedUrl, 2000);
  } catch (error) {
    showToast(error.message);
  }
};

// Add event listeners to buttons
document.querySelector(".btn1").addEventListener("click", signInUser);
document.querySelector(".btn2").addEventListener("click", createUser);
document.querySelector(".btn3").addEventListener("click", googleUser);

// Check for authenticated user and localStorage data
onAuthStateChanged(auth, (user) => {
  const localUser = getFromLocalStorage("user");

  if (user && localUser) {
    console.log("User logged in:", user.uid);
    console.log("Local Storage Data:", localUser);

    // Redirect to new URL
    setTimeout(changedUrl, 2000);
  }
});
