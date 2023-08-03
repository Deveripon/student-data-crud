//get roll number
const rollNumber = () => {
  const allData = getData("students");
  if (!allData || allData.length === 0) {
    return 880001;
  } else {
    return `88000${allData.length+1}`;
  }
}

//get reg number
const regNumber = () => {
  const allData = getData("students");
  if (!allData || allData.length === 0) {
    return 1195960001;
  } else {
    return `11959600${allData.length+1}`;
  }
}

//get id number
const idNumber = (length) => {
  let id = '';
  const data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * data.length);
    id += data.charAt(randomIndex);
  }
  return id;

}




//check email address
const uniqueEmail = (email) => {
  const allData = getData("students");
  if (allData) {
    const filterdEmail = allData.some((data) => email === data.email);
    return filterdEmail;
  }
}


//check mobile address
const uniqueMobile = (mobile) => {
  const allData = getData("students");
  if (allData) {
    const filterdMobile = allData.some((data) => mobile === data.mobile);
    return filterdMobile;
  }
}