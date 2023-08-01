const form = document.getElementById('form');
const regForm = document.querySelector('.reg-form');
const loginForm = document.querySelector('.login-form');
const setCredential = document.getElementById('set-credential');
const loginButton = document.getElementById('loginButton');
const msgArea = document.getElementById('msgArea');
const password = document.getElementById('password');
const logPassword = document.getElementById('log-password');
const conPassword = document.getElementById('con_pass');
const passShow = document.querySelectorAll(".passwordToggle")


//show registration form
setCredential.onclick = () => {
  regForm.style.display = 'flex';
  loginForm.style.display = 'none';
}
//show login form
loginButton.onclick = () => {
  regForm.style.display = 'none';
  loginForm.style.display = 'flex';
}

//alert close button
function closeAlert() {
  msgArea.innerHTML = ""
}


//get the registration data
// user regidtration
regForm.onsubmit = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let regData = Object.fromEntries(formData)
  //add some validation
  const {
    username,
    email,
    password
  } = regData
  if (!username || !email || !password) {
    msgArea.innerHTML = WarnalertMassage("All fields are required")
  } else if (!validateEmail(email)) {
    msgArea.innerHTML = WarnalertMassage("Please enter a valid email Address")
  } else if (!validatePassword(password)) {
    msgArea.innerHTML = WarnalertMassage("Password Should be at least 1 capital and 1 lower and must be at least 1 symbol and length will at least 7 digits.");
  } else {
    msgArea.innerHTML = successalertMassage("Credentials were successfully")

    // data send to the local storage
    let user = {
      username: username,
      email: email,
      password: password
    }
    sendData("user", user);
    //form reset
    e.target.reset();
  }

}


//user login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let loginData = Object.fromEntries(formData.entries())

  //match the username and password registered or not
  const {
    usernameEmail,
    password
  } = loginData

  let lsData = getData("user")
  let varifyData = lsData.find((data) => (data.username === usernameEmail && data.password === password) || (data.email === usernameEmail && data.password === password));
  console.log(varifyData);
  if (!varifyData) {
    msgArea.innerHTML = WarnalertMassage("Email or Username and paassword not matched");
  } else {
    window.location.href = "/public/pages/dashboard/dashboard.html"
  }

})


























//password show hide
for (let i = 0; i < passShow.length; i++) {

  passShow[i].addEventListener("click", function (e) {
    e.preventDefault();

    let passvalue = password.getAttribute("type");
    let conpassvalue = conPassword.getAttribute("type");
    let loginPassword = logPassword.getAttribute("type");
    if (passvalue == "password" && conpassvalue == "password") {
      password.setAttribute("type", "text");
      conPassword.setAttribute("type", "text");
      passShow.classList.replace("fa-eye-slash", "fa-eye");
    } else if (loginPassword == "password") {
      logPassword.setAttribute("type", "text");
      passShow.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      password.setAttribute("type", "password");
      conPassword.setAttribute("type", "password");
      logPassword.setAttribute("type", "password");
      passShow.classList.replace("fa-eye", "fa-eye-slash");
    }
  });
}