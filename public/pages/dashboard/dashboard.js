const addStudentButton = document.querySelectorAll(".add-student");
const studentAddForm = document.getElementById("student-add-form");
const studentShowTable = document.getElementById("student-show-table");
const manageStudentButton = document.querySelector(".manage-student");
const StudentAddingForm = document.getElementById("form-student-add");
const massgaeArea = document.getElementById("massgae-area");
const homeButton = document.querySelectorAll(".home-button");
const studentDataContainer = document.querySelector(".student-data-container");
const deleteConfirmation = document.getElementById("delete-confirmation");
const confirmModal = document.querySelector(".confirm-modal");
const confirmButton = document.querySelector(".confirm-button");
const cancelButton = document.querySelector(".cancel-button");
let alerta = document.getElementById("alert-area");
const singStudentModal = document.getElementById("studentDataviewModal");
const closeModalB = document.getElementById("closeModalB");
const SingleContent = document.querySelector(".main-content");
const studentResultAddModal = document.getElementById("studentResultAddModal");
const closeResultModal = document.getElementById("closeResultModal");
//Student Edit form modal intaraction
// Get the modal element
let modal = document.getElementById("studentDataEditModal");
// Get the close button element
let closeModalBtn = document.getElementById("closeModalBtn");

//alert close button
function closeAlert() {
  massgaeArea.innerHTML = "";
  alerta.innerHTML = "";
}

//show student add form
for (let i = 0; i < addStudentButton.length; i++) {
  addStudentButton[i].addEventListener("click", function (e) {
    e.preventDefault();
    studentShowTable.style.display = "none";
    studentAddForm.style.display = "block";
  });
} //show student add form
for (let i = 0; i < homeButton.length; i++) {
  homeButton[i].addEventListener("click", function (e) {
    e.preventDefault();
    studentShowTable.style.display = "block";
    studentAddForm.style.display = "none";
  });
}

//show all student list
manageStudentButton.onclick = (e) => {
  e.preventDefault();
  studentShowTable.style.display = "block";
  studentAddForm.style.display = "none";
};

//submit student add form
StudentAddingForm.onsubmit = (e) => {
  e.preventDefault();
  //get form data
  let formData = new FormData(e.target);
  let objectData = Object.fromEntries(formData);
  //distructuring the object
  const {
    f_name,
    l_name,
    fother_name,
    mother_name,
    dob,
    email,
    address,
    mobile,
    image,
  } = objectData;

  //check unique email address
  /*  if (uniqueEmail(email)) {
    massgaeArea.innerHTML = WarnalertMassage(
      "This email adress already exists"
    );
    return;
  }
  // check unique mobile number
  if (uniqueMobile(mobile)) {
    massgaeArea.innerHTML = WarnalertMassage(
      "This mobile number already exists"
    );
    return;
  } */

  //add validation
  if (
    !f_name ||
    !l_name ||
    !fother_name ||
    !mother_name ||
    !dob ||
    !email ||
    !address ||
    !mobile
  ) {
    massgaeArea.innerHTML = WarnalertMassage(
      "All fields are required . Please fill up all fields"
    );
  } else if (!validateEmail(email)) {
    massgaeArea.innerHTML = WarnalertMassage("invalid email address");
  } else if (!validateMobile(mobile)) {
    massgaeArea.innerHTML = WarnalertMassage("invalid mobile number");
  } else {
    const studentData = {
      ...objectData,
      studentId: idNumber(25),
      rollNumber: rollNumber(),
      regNumber: regNumber(),
      createdAt: Date.now(),
      status: "active",
    };
    //send data to local storage
    sendData("students", studentData);
    massgaeArea.innerHTML = successalertMassage(
      "Student data added successfully"
    );
    e.target.reset();
    showData();
  }
};

// data show to frontend

const showData = () => {
  const lsData = getData("students");
  let allStudents = "";
  if (lsData.length > 0) {
    lsData.reverse().map((student, index) => {
      //show time ago functionality
      function updateTimeAgo() {
        const createdAt = student.createdAt;

        const now = new Date();
        const timeDifference = Math.floor((now - createdAt) / 1000); // Time difference in seconds
        let timeAgo;

        if (timeDifference < 60) {
          timeAgo = `${timeDifference} seconds ago`;
        } else if (timeDifference < 3600) {
          timeAgo = `${Math.floor(timeDifference / 60)} minutes ago`;
        } else if (timeDifference < 86400) {
          timeAgo = `${Math.floor(timeDifference / 3600)} hours ago`;
        } else if (timeDifference < 2592000) {
          timeAgo = `${Math.floor(timeDifference / 86400)} days ago`;
        }
        return timeAgo;
      }
      // Update timestamps every 60 seconds to keep the "time ago" text accurate
      setInterval(updateTimeAgo, 60000);
      allStudents += `
      <tr class="border transform duration-300 hover:bg-slate-400 border-sky-200">
                <td>${
                  index + 1
                } <span class="font-extrabold text-gray-800">.</span></td>
                <td class="pl-5"><img class="w-12 h-12" src="${
                  student.image
                }" alt=""></td>
                <td>${student.f_name} ${student.l_name}</td>
                <td>${student.course}</td>
                <td>${student.rollNumber}</td>
                <td>${student.regNumber}</td>              
                <td>${updateTimeAgo()}</td>
  
                <td> <i class="fa-solid fa-circle" style="color: #1ba73e;"></i> ${
                  student.status
                }</td>
                <td>
                  <ul class="flex justify-center items-center action-button">
                    <li>
                    <a class="view-button" href="#" onclick="viewStudent('${
                      student.studentId
                    }')">
                    <i class="ri-eye-line text-green-700 transform hover:text-gray-800 duration-300"></i>
                    </a>
                    </li>
                    <li> 
                    <a href="#" class="edit-button" onclick="editStudent('${
                      student.studentId
                    }')" >
                    <i class="ri-edit-box-line text-orange-400 transform hover:text-gray-800 duration-300"></i>
                    </a>
                    </li>
                    <li>
                    <a href="#" class="delete-button" onclick="deleteStudent('${
                      student.studentId
                    }')" ><i
                    class="ri-delete-bin-2-line text-red-500 transform hover:text-gray-800 duration-300"></i>
                    </a>
                    </li>
                  </ul>
                </td>
                <td style="cursor:pointer" class="bg-green-400 hover:bg-green-900 hover:text-white cursor-pointer">
                <button onclick="addStudentResult('${
                  student.studentId
                }')" ><i
                class="ri-add-circle-line"></i> Add Result</button>
                </td>
              </tr>
      `;
    });
    studentDataContainer.innerHTML = allStudents;
  } else {
    studentDataContainer.innerHTML = `<tr class="border transform duration-300 hover:bg-slate-400 border-sky-200">
         <td class="px-4 py-40 text-red-400 text-2xl" colspan="10">No data Found</td>
      </tr>
`;
  }
};
showData();

//delete student data
function deleteStudent(id) {
  let conf = confirm("Are you sure you want to delete");
  if (conf) {
    const lsData = getData("students");
    const filterdData = lsData.filter((data) => data.studentId !== id);
    localStorage.setItem("students", JSON.stringify(filterdData));
    showData();
  }
}

// edit student data
function editStudent(id) {
  modal.style.display = "block";
  //get the edit form inputs
  const editForm = document.getElementById("student-edit-form");
  const f_name = editForm.querySelector(`input[name="f_name"]`);
  const l_name = editForm.querySelector(`input[name="l_name"]`);
  const father_name = editForm.querySelector(`input[name="fother_name"]`);
  const mother_name = editForm.querySelector(`input[name="mother_name"]`);
  const dob = editForm.querySelector(`input[name="dob"]`);
  const gender = editForm.querySelector(`input[name="gender"]`);
  const mobile = editForm.querySelector(`input[name="mobile"]`);
  const email = editForm.querySelector(`input[name="email"]`);
  const address = editForm.querySelector(`textarea[name="address"]`);
  const course = editForm.querySelector(`select[name="course"]`);
  const studentId = editForm.querySelector(`input[name="studentId"]`);
  const image = editForm.querySelector(`input[name="image"]`);

  const lsData = getData("students");
  const filterdData = lsData.find((data) => data.studentId === id);

  //pass data value to edit form
  f_name.value = filterdData.f_name;
  l_name.value = filterdData.l_name;
  father_name.value = filterdData.fother_name;
  mother_name.value = filterdData.mother_name;
  dob.value = filterdData.dob;
  mobile.value = filterdData.mobile;
  email.value = filterdData.email;
  address.value = filterdData.address;
  course.value = filterdData.course;
  studentId.value = filterdData.studentId;
  image.value = filterdData.image;
  //set gender selection
  if (gender.value == filterdData.gender) {
    const gender = (editForm.querySelector(
      `input[value="${filterdData.gender}"]`
    ).checked = true);
  }

  //submit form data
  editForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());

    // //tudecheck unique email address
    // if (uniqueEmail(objectData.email)) {
    //   alerta.innerHTML = WarnalertMassage("This email adress already exists");
    //   return;
    // }
    // // check unique mobile number
    // if (uniqueMobile(objectData.mobile)) {
    //   alerta.innerHTML = WarnalertMassage("This mobile number already exists");
    //   return;
    // }

    //add validation
    if (
      !objectData.f_name ||
      !objectData.l_name ||
      !objectData.fother_name ||
      !objectData.mother_name ||
      !objectData.dob ||
      !objectData.email ||
      !objectData.address ||
      !objectData.mobile
    ) {
      alerta.innerHTML = WarnalertMassage(
        "All fields are required . Please fill up all fields"
      );
    } else if (!validateEmail(objectData.email)) {
      alerta.innerHTML = WarnalertMassage("invalid email address");
    } else if (!validateMobile(objectData.mobile)) {
      alerta.innerHTML = WarnalertMassage("invalid mobile number");
    } else {
      const updatedData = {
        ...filterdData,
        ...objectData,
      };
      //find the index of edited data
      const indexOfData = lsData.findIndex((item) => item.studentId === id);
      lsData[indexOfData] = updatedData;
      // send data to localStorage
      localStorage.setItem("students", JSON.stringify(lsData));
      alerta.innerHTML = successalertMassage("data updated successfully");
      showData();
      e.target.reset();
    }
  };
}

//view single student data

function viewStudent(id) {
  singStudentModal.style.display = "block";
  const lsData = getData("students");
  const filterdData = lsData.find((item) => item.studentId === id);

  let singleStudentData = `
  
  <div class="profile-top flex bg-gray-200 rounded-sm w-full py-8 ">
  <div class="img-area">
    <img class="w-44 rounded-sm"
      src="${filterdData.image}" alt="${filterdData.f_name}">
  </div>
  <div class="bio-area">
    <h2 class="text-purple-600 text-3xl uppercase">${filterdData.f_name} ${filterdData.l_name}</h2>
    <p class="text-emerald-700 text-md">${filterdData.course}</p>
  </div>
</div>
<div class="personal-information bg-purple-100">
  <h4 class="font-bold text-md text-gray-800 ml-4">Personal Information</h4>
  <div class="info-box ml-40">
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Name :</h4>
      <h6>${filterdData.f_name} ${filterdData.l_name}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Father's Name :</h4>
      <h6>${filterdData.fother_name}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Mothers's Name :</h4>
      <h6>${filterdData.mother_name}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Address :</h4>
      <h6>${filterdData.address}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Roll Number :</h4>
      <h6>${filterdData.rollNumber}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8">Registration Number :</h4>
      <h6>${filterdData.regNumber}</h6>
    </div>
    <div class="info-group flex ml-4 py-1">
      <h4 class="font-medium mr-8"> Course :</h4>
      <h6>${filterdData.course}</h6>
    </div>
    <div class="info-group flex ml-4 py-2">
      <h4 class="font-medium mr-8">Date Of Birth :</h4>
      <h6>${filterdData.dob}</h6>
    </div>
    <div class="info-group flex ml-4 py-2">
      <h4 class="font-medium mr-8">Student Status:</h4>
      <h6>Active</h6>
    </div>
  </div>

</div>
  
  `;
  SingleContent.innerHTML = singleStudentData;
}

//add student result add modal interaction

const addStudentResult = (id) => {
  studentResultAddModal.style.display = "block"
  //get the data of the studentId
  const lsData = getData("students")
  const filterdData = lsData.find((item) => item.studentId === id);
  const studentResultAddForm = document.getElementById("studentResultAddForm")
  const name = studentResultAddForm.querySelector("input[name='name']").value = filterdData.f_name + " " + filterdData.l_name;
  const rollNumber = studentResultAddForm.querySelector("input[name='rollNumber']").value = filterdData.rollNumber;
  const studenId = studentResultAddForm.querySelector("input[name='studentId']").value = filterdData.studentId

  //result submission
  studentResultAddForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectData = Object.fromEntries(formData.entries());
    const updatedData = {
      ...filterdData,
      result: objectData
    }
    //find index of filterd data

    const filterdDataIndex =


  }

}



// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  singStudentModal.style.display = "none";
  studentResultAddModal.style.display = "none";
}

// Event listener for closing the modal
closeModalBtn.addEventListener("click", closeModal);
closeModalB.addEventListener("click", closeModal);
closeResultModal.addEventListener("click", closeModal);

// Event listener to close the modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

//alert close button
function closeAlert() {
  alerta.innerHTML = "";
  massgaeArea.innerHTML = "";
}