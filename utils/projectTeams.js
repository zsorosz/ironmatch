const goodMatches = (allStudents, student) => {
  let goodArr = [];
  allStudents.forEach((el) => {
    if (
      (el.orangeList.includes(student._id) &&
        student.greenList.includes(el._id)) ||
      (student.orangeList.includes(el._id) &&
        el.greenList.includes(student._id))
    ) {
      goodArr.push(el);
    }
  });
  return goodArr;
};

const okMatches = (allStudents, student) => {
  let okArr = [];
  allStudents.forEach((el) => {
    if (
      !el.greenList.includes(student._id) &&
      !student.greenList.includes(el._id) &&
      !student.redList.includes(el._id) &&
      !el.redList.includes(student._id)
    ) {
      okArr.push(el);
    }
  });
  return okArr;
};

module.exports = { goodMatches, okMatches };
