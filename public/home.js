import {
  auth,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "./firebase.js";

// DOM Elements to display blogs
const blogContainer = document.getElementById("blog-container");
const designThinking = document.getElementById("DesignThinking");
const technology = document.getElementById("Technology");
const web3 = document.getElementById("Web3");
const programming = document.getElementById("Programming");
const ai = document.getElementById("AI");

// Store the user info globally
let currentUser = null;

// Function to create a blog card
const createBlogCard = (blog, docId) => {
  const blogCard = document.createElement("div");
  blogCard.classList.add("col-12", "col-md-6", "col-lg-4", "blog-card");

  const isAuthor = currentUser && blog.authorId === currentUser.uid;
  const userInfo = currentUser ? `
    <div class="d-flex align-items-center mb-3">
      <img src="${currentUser.photoURL || 'images/anonymous.png'}" alt="User Avatar" class="rounded-circle" width="40" height="40">
      <span class="ms-2">${currentUser.displayName || 'Anonymous'}</span>
    </div>
  ` : `
    <div class="d-flex align-items-center mb-3">
      <img src="images/anonymous.png" alt="User Avatar" class="rounded-circle" width="30" height="30">
      <span class="ms-2">Anonymous</span>
    </div>
  `;

  const authorIcon = isAuthor ? `
    <div class="author-icon dlt-icon">
      <div class="edit-icon" data-doc-id="${docId}">
        🗑️
      </div>
    </div>
  ` : '';

  blogCard.innerHTML = `
    <div class="card shadow-sm h-100">
      <div class="card-body">
        ${userInfo}
        ${authorIcon}
        <h5 class="card-title">${blog.title}</h5>
        <p class="card-text text-muted">${new Date(blog.timestamp).toLocaleDateString()}</p>
        <p class="card-text">${blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}</p>
      </div>
    </div>
  `;

  return blogCard;
};

// Fetch Blogs from Firestore with optional category filter
const fetchBlogs = async (category = "") => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    blogContainer.innerHTML = ""; // Clear existing content

    if (querySnapshot.empty) {
      blogContainer.innerHTML = `
        <div class="col-12 text-center">
          <p class="text-muted">No blogs available at the moment. Check back later!</p>
        </div>
      `;
      return;
    }

    querySnapshot.forEach((doc) => {
      const blog = doc.data();

      // Filter blogs based on category
      if (category === "" || blog.category === category) {
        const blogCard = createBlogCard(blog, doc.id); // Pass the document ID to createBlogCard
        blogContainer.appendChild(blogCard);
      }
    });

    // Change the appearance of the selected badge
    updateSelectedBadge(category);

    // Add event listener to each delete button
    const deleteButtons = document.querySelectorAll('.edit-icon');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const docId = event.target.getAttribute('data-doc-id');
        dltBlog(docId); // Delete the blog using the docId
      });
    });
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    blogContainer.innerHTML = `
      <div class="col-12 text-center">
        <p class="text-danger">Failed to load blogs. Please try again later.</p>
      </div>
    `;
  }
};

// Function to update the selected badge's color
const updateSelectedBadge = (selectedCategory) => {
  // Remove the "selected" class from all badges
  const badges = [designThinking, technology, web3, programming, ai];
  badges.forEach((badge) => {
    badge.classList.remove("selected");
  });

  // Add the "selected" class to the badge corresponding to the selected category
  if (selectedCategory) {
    const selectedBadge = document.getElementById(selectedCategory);
    if (selectedBadge) {
      selectedBadge.classList.add("selected");
    }
  }
};

// Event listeners for badges to filter by category
designThinking.addEventListener("click", () => fetchBlogs("Design Thinking"));
technology.addEventListener("click", () => fetchBlogs("Technology"));
web3.addEventListener("click", () => fetchBlogs("Web3"));
programming.addEventListener("click", () => fetchBlogs("Programming"));
ai.addEventListener("click", () => fetchBlogs("AI"));

// Call fetchBlogs on page load (Show all blogs initially)
document.addEventListener("DOMContentLoaded", () => {
  // Get the current user on page load
  onAuthStateChanged(auth, (user) => {
    currentUser = user; // Store the user info
    fetchBlogs(); // Fetch blogs after getting the user
  });
});

// Function to delete blog from Firestore
const dltBlog = async (docId) => {
  try {
    const blogDocRef = doc(db, "blogs", docId); // Get a reference to the blog document
    await deleteDoc(blogDocRef); // Delete the document from Firestore
    alert("Blog deleted successfully!");
    fetchBlogs(); // Refresh the blog list after deletion
  } catch (error) {
    console.error("Error deleting blog: ", error);
    alert("Failed to delete the blog. Please try again.");
  }
};
