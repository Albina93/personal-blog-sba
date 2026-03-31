// console.log("hello");
// form, input fields
const form = document.getElementById("form");
const title = document.getElementById("title");
const content = document.getElementById("content");
const postContainer = document.getElementById("postContainer");

// error spans
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

title.addEventListener("input", validateTitle);
function validateTitle() {
  if (title.value.trim() === "") {
    titleError.textContent = "Hey title is required, can not be empty!";
  } else {
    titleError.textContent = "";
  }
}

content.addEventListener("input", validateContent);
function validateContent() {
  if (content.value.trim() === "") {
    contentError.textContent =
      "Please content is required, it can not be empty!";
  } else if (content.validity.tooShort) {
    contentError.textContent = `Content must be at least minimum ${content.minLength} characters`;
  } else {
    contentError.textContent = "";
  }
}
