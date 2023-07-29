//email validation
//riponmiah858@gmail.com
function validateEmail(email) {
  const pattern = /^[a-z0-9\._]{1,}@[a-z0-9\._]{3,}\.[a-z0-9]{1,}$/;
  return pattern.test(email);
}

//phone number validator
//01913509868
function validateMobile(mobile) {
  const pattern = /^(01|\+8801|8801)[0-9]{9}$/;
  return pattern.test(mobile);
}

//password validator

function validatePassword(password) {
  const pattern =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\+\=\|\`\<\>\.\,/\?])[A-Za-z0-9!@#$%^&*()_\.\+~\<>/\?| ]{7,}/;
  return pattern.test(password);
}

// Warning alert massage function

function WarnalertMassage(massage) {
  return `
  <div class="alert-box transform transition-all duration-500 w-96 bg-orange-300 flex p-2 items-center">
  <div class="icon mr-3">
     <i class="fa-solid fa-circle-exclamation text-red-500 "></i>
  </div>
  <div class="massage">
     <p class="text-gray-600">${massage}</p>
  </div>
  <div
    class="close-button place-self-end ml-3 transform transition-all cursor-pointer hover:text-orange-600 duration-300"
    onclick="closeAlert()"
  >
    <i class="fa-regular fa-circle-xmark text-red-800 "></i>
  </div>
</div>

`;
}
//success message
function successalertMassage(massage) {
  return `
  <div class="alert-box transform transition-all duration-500 w-96 bg-green-300 flex p-2 items-center">
  <div class="icon mr-3">
     <i class="fa-solid fa-thumbs-up text-green-800"></i>
  </div>
  <div class="massage">
     <p class="text-gray-600">${massage}</p>
  </div>
  <div
    class="close-button place-self-end ml-3 transform transition-all cursor-pointer hover:text-orange-600 duration-300"
    onclick="closeAlert()"
  >
    <i class="fa-regular fa-circle-xmark text-red-800 "></i>
  </div>
</div>

`;
}

//data send to local storage

function sendData(key, data) {
  let userData = [];
  let lsData = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
  if (!lsData) {
    userData.push(data);
    localStorage.setItem(key, JSON.stringify(userData));
  } else {
    userData = JSON.parse(localStorage.getItem(key));
    userData.push(data);
    localStorage.setItem(key, JSON.stringify(userData));
  }
}

//data get from localStorage
function getData(key) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : false;
}

