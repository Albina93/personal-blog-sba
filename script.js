// Selecting form, input fields
const form = document.getElementById("form");
const title = document.getElementById("title");
const content = document.getElementById("content");

// error spans
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

let posts = [];

title.addEventListener("input", validateTitle);
function validateTitle() {
  if (title.value.trim() === "") {
    titleError.textContent = "Hey title is required, can not be empty!";
    return false;
  } else {
    titleError.textContent = "";
    return true;
  }
}

content.addEventListener("input", validateContent);
function validateContent() {
  if (content.value.trim() === "") {
    contentError.textContent =
      "Please content is required, it can not be empty!";
    return false;
  } else if (content.validity.tooShort) {
    contentError.textContent = `Content must be at least minimum ${content.minLength} characters`;
    return false;
  } else {
    contentError.textContent = "";
    return true;
  }
}

form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  let p = document.getElementById("par");
  const isValid = validateTitle() && validateContent();
  if (isValid) {
    // get values
    let newTitle = title.value.trim();
    let newContent = content.value.trim();

    // create object
    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };

    // add to array of posts
    posts.push(newPost);
    // console.log(posts);

    savePosts();
    displayPosts();

    p.textContent = "Submission is success!";
    // clear all inputs inside the form
    form.reset();
  } else {
    p.textContent = "Please fix the errors!";
  }
}

// saving data to browser
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts)); // convert array to string
}

// loading data from browser
function loadPosts() {
  const data = localStorage.getItem("posts");
  if (data) {
    posts = JSON.parse(data); // converting string back to array
  } else {
    posts = [];
  }
}

function displayPosts() {
  const postContainer = document.getElementById("postContainer");

  // clear old posts first
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `<h3>${post.title}</h3> <p>${post.content}</p>
    <button class="del" onclick="deletePost(${post.id})">Delete</button>
    <button class="edit" onclick="editPost(${post.id})">Edit</button>
    `;
    postContainer.appendChild(postDiv);
  });
}

function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);

  savePosts();
  displayPosts();
}

function editPost(id) {
  // find the post
  const post = posts.find((post) => post.id === id);

  // need to fill form inputs with data
  title.value = post.title;
  content.value = post.content;

  // need to remove the old version
  posts = posts.filter((post) => post.id !== id);
}

loadPosts();
displayPosts();
