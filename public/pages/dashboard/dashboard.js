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
const alertMassageArea = document.getElementById("alert-massage-area");
const studentResultShowModal = document.getElementById("studentResultShowModal")
const closeViewResultModal = document.getElementById("closeViewResultModal")
const resultBox = document.getElementById("resultBox")
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
} //showstudent add form
for (let i = 0; i < homeButton.length; i++) {
    homeButton[i].addEventListener("click", function (e) {
        e.preventDefault();
        studentShowTable.style.display = "block";
        studentAddForm.style.display = "none";
    });
} //show allstudent list 
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
    if (uniqueEmail(email)) {
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
    }

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
            // Update timestamps every 60
            // seconds to keep the "time ago" text accurate
            setInterval(updateTimeAgo, 60000);
            allStudents += ` <tr
        class="border transform duration-300 hover:bg-slate-400 border-sky-200">
        <td>${
            index + 1
            } <span class="font-extrabold text-gray-800">.</span></td>
        <td class="pl-5"><img class="w-12 h-12" src="${
                  student.image
                }" alt="">
        </td>
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
                    <a class="view-button" href="#"
                        onclick="viewStudent('${
                      student.studentId
                    }')">
                        <i class="ri-eye-line text-green-700 transform hover:text-gray-800 duration-300"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="edit-button"
                        onclick="editStudent('${
                      student.studentId
                    }')">
                        <i class="ri-edit-box-line text-orange-400 transform hover:text-gray-800 duration-300"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="delete-button"
                        onclick="deleteStudent('${
                      student.studentId
                    }')"><i
                            class="ri-delete-bin-2-line text-red-500 transform hover:text-gray-800 duration-300"></i>
                    </a>
                </li>
            </ul>
        </td>
        ${student.result?
        ` <td style="cursor:pointer" class=" bg-green-400 hover:bg-green-900 text-white font-medium cursor-pointer">
            <button 
            onclick="viewResult('${
              student.studentId
            }')">
            <i class="ri-eye-line"></i>View Result</button>
        </td>`:
     ` <td style="cursor:pointer" class=" bg-orange-400 hover:bg-orange-600 hover:text-white cursor-pointer">
          <button 
          onclick="addStudentResult('${
          student.studentId
        }')">
        <i class="ri-add-circle-line"></i> Add Result</button>
     </td>`}
       

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
        // alerta.innerHTML = WarnalertMassage("This email adress already exists");
        // return;
        // }
        // // check unique mobile number
        // if (uniqueMobile(objectData.mobile)) {
        // alerta.innerHTML = WarnalertMassage("This mobile number already exists");
        // return;
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
                <img class="w-44 rounded-sm" src="${filterdData.image}" alt="${filterdData.f_name}">
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
    const name = studentResultAddForm.querySelector("input[name='name']").value = filterdData.f_name + " " +
        filterdData.l_name;
    const rollNumber = studentResultAddForm.querySelector("input[name='rollNumber']").value =
        filterdData.rollNumber;
    const studentId = studentResultAddForm.querySelector("input[name='studentId']").value = filterdData.studentId


    //result submission
    studentResultAddForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const objectData = Object.fromEntries(formData.entries());

        // add validation
        if (!objectData.bangla || !objectData.english || !objectData.math || !objectData.science || !objectData.s_science || !objectData.religion) {
            alertMassageArea.innerHTML = WarnalertMassage("All Fields are required")
            return;
        }

        const updatedData = {
            ...filterdData,
            result: objectData
        }
        //find index of filterd data
        const filterdDataIndex = lsData.findIndex((item) => item.studentId === studentId);
        const resultAddedStudents = lsData[filterdDataIndex] = updatedData
        //send data to local storage
        localStorage.setItem("students", JSON.stringify(lsData));
        showData();
        alertMassageArea.innerHTML = successalertMassage("Result Added Success")
        e.target.reset();
    }
}


//show single student Result 

const viewResult = (id) => {
    studentResultShowModal.style.display = "block";
    const lsData = getData("students")
    const filterdData = lsData.find((item) => item.studentId === id);

    //calculate the result

    let gpaCal = (marks) => {
        let gpa;
        let grade;
        let result;
        if (marks >= 0 && marks < 33) {
            gpa = 0;
            grade = "F";
            result = "Failed"
        } else if (marks >= 33 && marks < 40) {
            gpa = 1;
            grade = "D";
            result = "Passed"
        } else if (marks >= 40 && marks < 50) {
            gpa = 2;
            grade = "C";
            result = "Passed"
        } else if (marks >= 50 && marks < 60) {
            gpa = 3;
            grade = "B";
            result = "Passed"
        } else if (marks >= 60 && marks < 70) {
            gpa = 3.5;
            grade = "A-";
            result = "Passed"
        } else if (marks >= 70 && marks < 80) {
            gpa = 4;
            grade = "A";
            result = "Passed"
        } else if (marks >= 80 && marks <= 100) {
            gpa = 5;
            grade = "A+";
            result = "Passed"
        }
        return {
            gpa: gpa,
            grade: grade,
            result: result

        }
    };



    function getCgpa() {
        const resultObj = filterdData.result;
        delete resultObj.studentId
        const resultArry = Object.values(resultObj);

        let totalCgpa = 0;
        resultArry.map((marks) => {
            totalCgpa += parseInt(marks)
        });
        return totalCgpa / resultArry.length;

    }
    getCgpa();

    resultBox.innerHTML = `
    
    <div class="marksheet border-4 rounded-md border-green-800">
    <div class="marksheet-header flex justify-center my-10 border-1 border-gray-700">
      <img class="institute_logo w-48 h-28 object-fill" src="../../images/download.png"
        alt="institute logo" />
      <div class="institute-info mt-8 px-7">
        <h2 class="text-4xl font-bold font-serif">
          Sorobindu Pilot High School
        </h2>
        <p>
          Chowrangi KachaBazar, Suihari, Dinajpur Sadar, Dinajpur
        </p>
        <h4 class="text-2xl font-medium">
          Secondary School Certificate - 2023
        </h4>
      </div>
      <img class="devripon_logo w-44" src="../../images/devriponlog.png" alt="devripon logo" />
    </div>
    <div class="student-info-area border-2 border-gray-700 py-5 w-11/12 block m-auto px-5">
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Name :</h4>
        <p>${filterdData.f_name} ${filterdData.l_name}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Father Name :</h4>
        <p>${filterdData.fother_name}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Mother Name :</h4>
        <p>${filterdData.mother_name}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Roll Number :</h4>
        <p>${filterdData.rollNumber}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Registration Number :</h4>
        <p>${filterdData.regNumber}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Date of Birth :</h4>
        <p>${filterdData.dob}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Academic Year :</h4>
        <p>2023-2024</p>
      </div>
    </div>

    <div class="result-area">
      <table id="result-table"
        class="w-11/12 m-auto mt-5 table-auto border-collapse border-spacing-2 border border-slate-500 text-gray-700 text-sm">
        <thead class="border-1 border-gray-600 h-8 bg-slate-200">
          <th class="border-1 border-gray-600">Sl</th>
          <th class="border-1 border-gray-600">Subject Name</th>
          <th class="border-1 border-gray-600">Maximum Marks</th>
          <th class="border-1 border-gray-600">Obtained Marks</th>
          <th class="border-1 border-gray-600">GPA</th>
          <th class="border-1 border-gray-600">GRADE</th>
        </thead>
        <tbody class="border-1 h-8 m-auto text-center">
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">1</td>
            <td class="border-1 border-gray-600">Bangla</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">${filterdData.result.bangla}</td>
            <td class="border-1 border-gray-600">${gpaCal(filterdData.result.bangla).gpa}</td>
            <td class="border-1 border-gray-600">${gpaCal(filterdData.result.bangla).grade}</td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">2</td>
            <td class="border-1 border-gray-600">English</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">${filterdData.result.english}</td>
            <td class="border-1 border-gray-600">${gpaCal(filterdData.result.english).gpa}</td>
            <td class="border-1 border-gray-600">${gpaCal(filterdData.result.english).grade}</td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
          <td class="border-1 border-gray-600">3</td>
          <td class="border-1 border-gray-600">Mathmatics</td>
          <td class="border-1 border-gray-600">100</td>
          <td class="border-1 border-gray-600">${filterdData.result.math}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.math).gpa}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.math).grade}</td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
          <td class="border-1 border-gray-600">4</td>
          <td class="border-1 border-gray-600">Mathmatics</td>
          <td class="border-1 border-gray-600">100</td>
          <td class="border-1 border-gray-600">${filterdData.result.science}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.science).gpa}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.science).grade}</td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
          <td class="border-1 border-gray-600">5</td>
          <td class="border-1 border-gray-600">Social Science</td>
          <td class="border-1 border-gray-600">100</td>
          <td class="border-1 border-gray-600">${filterdData.result.s_science}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.s_science).gpa}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.s_science).grade}</td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
          <td class="border-1 border-gray-600">6</td>
          <td class="border-1 border-gray-600">Religion</td>
          <td class="border-1 border-gray-600">100</td>
          <td class="border-1 border-gray-600">${filterdData.result.religion}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.religion).gpa}</td>
          <td class="border-1 border-gray-600">${gpaCal(filterdData.result.religion).grade}</td>
          </tr>
          <tr class="border-1 bg-teal-100 py-4 h-8 border-gray-800">
            <td colspan="3" class="border-1 border-gray-600">CGPA : ${gpaCal(getCgpa()).gpa} </td>
            <td colspan="3" class="border-1 border-gray-600">GRADE : ${gpaCal(getCgpa()).grade} </td>
          </tr>
          <tr class="border-1 bg-teal-100 py-4 h-8 border-gray-800">
            <td colspan="6" class="border-1 text-start pl-7 border-gray-600">Result : ${gpaCal(getCgpa()).result}  </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="signature-area h-60 items-center flex justify-between w-11/12 m-auto ">
      <div class="mentor-sign mt-48 flex flex-col justify-center items-center">
        <img src="../../images/img.png" alt="signature">
        <p class="text-xs font-medium ">Mentor's Sign</p>
      </div>
      <div class="office-seal flex flex-col justify-center items-center ">
        <img src="../../images/sorobindu_seal.png" alt="signature">
        <p class="text-xs font-medium ">Office Seal</p>
      </div>
      <div class="principal-sign mt-48 flex flex-col justify-center items-center">
        <img src="../../images/img (1).png" alt="signature">
        <p class="text-xs font-medium ">Principal's Sign</p>
      </div>
    </div>
    <div class="discalimer">
      <p class="py-5 w-11/12 block m-auto text-xs font-medium">NB : <span class="font-normal">Lorem ipsum
          dolor sit amet
          consectetur, adipisicing
          elit. Beatae at in quasi eos fugit
          possimus doloribus quam qui iusto rerum.</span></p>
    </div>


  </div>

    `;

}




// Function to close the modal
function closeModal() {
    modal.style.display = "none";
    singStudentModal.style.display = "none";
    studentResultAddModal.style.display = "none";
    studentResultShowModal.style.display = "none";
}

// Event listener for closing the modal
closeModalBtn.addEventListener("click", closeModal);
closeModalB.addEventListener("click", closeModal);
closeResultModal.addEventListener("click", closeModal);
closeViewResultModal.addEventListener("click", closeModal);

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
    alertMassageArea.innerHTML = "";
}