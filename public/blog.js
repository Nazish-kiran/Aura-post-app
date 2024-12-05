// Import Firebase functions
import {
  auth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  db,
  collection,
  addDoc,
  query, orderBy
} from "./firebase.js";
// DOM Elements
const addTitle = document.getElementById("add-title")
const addBlogButton = document.getElementById("add-blog-btn");
const addContent = document.getElementById("add-content");
const toast = document.getElementById("snackbar");
const myCat = document.getElementById("blog-category");
let currentUser = null
const toastMessage = (message) => {
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
};
onAuthStateChanged(auth, (user) => {
  currentUser = user; // Store the user info when logged in
});

addBlogButton.addEventListener("click", async () => {
  const title = addTitle.value.trim();
  const content = addContent.value.trim();
  const category = myCat.value.trim();
  console.log(category);
  

  if (!title || !content) {
      toastMessage("Please fill in all fields!");
      return;
  }

  try {
      // Add blog to Firestore
      const docRef = await addDoc(collection(db, "blogs"), {
          title,
          content,
          category,
          timestamp: new Date().toISOString(),
          authorId: currentUser.uid, 
      });
      toastMessage("Blog added successfully!");
      console.log("Document written with ID: ", docRef.id);

      // Clear input fields
      addTitle.value = "";
      addContent.value = "";
      myCat.value = "";
  } catch (error) {
      console.error("Error adding document: ", error);
      toastMessage("Error adding blog. Please try again.");
  }
});

