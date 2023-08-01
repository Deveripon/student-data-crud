const addStudentButton = document.querySelectorAll(".add-student")
const studentAddForm = document.getElementById("student-add-form")
const studentShowTable = document.getElementById("student-show-table")
const manageStudentButton = document.querySelector(".manage-student")
const StudentAddingForm = document.getElementById("form-student-add")
const massgaeArea = document.getElementById("massgae-area")

//alert close button
function closeAlert() {
  massgaeArea.innerHTML = ""
}


//show student add form
for (let i = 0; i < addStudentButton.length; i++) {
  addStudentButton[i].addEventListener("click", function (e) {
    e.preventDefault();
    studentShowTable.style.display = "none";
    studentAddForm.style.display = "block";

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
  let formData = new FormData(e.target);
  let objectData = Object.fromEntries(formData)
  console.log(objectData);
  const {
    f_name,
    l_name,
    fother_name,
    mother_name,
    dob,
    email,
    address,
    mobile
  } = objectData;
  if (!f_name || !l_name || !fother_name || !mother_name || !dob || !email || !address || !mobile) {
    massgaeArea.innerHTML = WarnalertMassage("All fields are required . Please fill up all fields");
  }

}