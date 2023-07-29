const login = document.getElementById("login");
const registration = document.getElementById("registration");
const loginButton = document.getElementById("login-button");
const registrationButton = document.getElementById("registration-button");
const loginSection = document.querySelector(".login-section");
const registrationSection = document.querySelector(".registration-section");
const loginLink = document.querySelector(".login-link");
const regiLink = document.querySelector(".regi-link");
const pageLoader = document.querySelector(".page-loader");

//button interaction
registrationButton.addEventListener("click", (e) => {
  e.preventDefault();
  loginSection.classList.add("hidden");
  registrationSection.classList.remove("hidden");
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  registrationSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

//link interaction
regiLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginSection.classList.add("hidden");
  registrationSection.classList.remove("hidden");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  registrationSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

//adding page loader
window.addEventListener("load", function () {
  setTimeout(() => {
    pageLoader.classList.replace("flex", "hidden");
  }, 1000);
});
