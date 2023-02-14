const createMatches = (student) => {
  let matches = {
    perfect: [],
    good: [],
    ok: [],
    bad: [],
    veryBad: [],
  };

  student.greenList.forEach((green) => {
    if (green.greenList.includes(student._id)) {
      matches.perfect.push(green);
    }
  });

  student.greenList.forEach((green) => {
    if (green.orangeList.includes(student._id)) {
      matches.good.push(green);
    }
  });
  student.orangeList.forEach((orange) => {
    if (orange.greenList.includes(student._id)) {
      matches.good.push(orange);
    }
  });

  student.orangeList.forEach((orange) => {
    if (orange.orangeList.includes(student._id)) {
      matches.ok.push(orange);
    }
  });

  student.redList.forEach((red) => {
    if (
      red.orangeList.includes(student._id) ||
      red.greenList.includes(student._id)
    ) {
      matches.bad.push(red);
    }
  });
  student.orangeList.forEach((orange) => {
    if (orange.redList.includes(student._id)) {
      matches.bad.push(orange);
    }
  });
  student.greenList.forEach((green) => {
    if (green.redList.includes(student._id)) {
      matches.bad.push(green);
    }
  });
  student.redList.forEach((red) => {
    if (red.redList.includes(student._id)) {
      matches.veryBad.push(red);
    }
  });

  return matches;
};

module.exports = createMatches;
