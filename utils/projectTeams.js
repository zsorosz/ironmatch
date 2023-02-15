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

const createTeams = (teams) => {
  let finalTeams = [];
  teams.forEach((studentId) => {
    if (studentId.length < 25) {
      let groupName = new Array(studentId);
      finalTeams.push(groupName);
    } else {
      let firstId = studentId.slice(0, 24);
      let secondId = studentId.slice(25, studentId.length);
      finalTeams.forEach((team) => {
        if (team.includes(firstId) && !team.includes(secondId)) {
          team.push(secondId);
        }
      });
    }
  });
  let reallyFinalTeams = [];

  finalTeams.forEach((team) => {
    reallyFinalTeams.push(team.sort().join(","));
  });

  const reallyReallyFinalTeams = [...new Set(reallyFinalTeams)];

  let result = [];

  reallyReallyFinalTeams.forEach((team) => {
    let groupName = new Array(team);
    result.push(groupName);
  });

  let finalResult = [];
  result.forEach((team) => {
    finalResult.push(team[0].split(","));
  });
  return finalResult;
};

module.exports = { createMatches, createTeams };
