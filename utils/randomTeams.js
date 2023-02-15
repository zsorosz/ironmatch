const randomGroup = (students, groupSize) => {
    let cloned = [...students]
    let allGroups = []
  
    for(let i = 0; i < students.length; i++){
        let randomIndex = Math.floor(Math.random() * cloned.length)
        let randomStudent = cloned[randomIndex]
        let currentGroupIndex = Math.floor(i / groupSize)
        
        if(i === 0 || i % groupSize === 0){
          let groupName = new Array(randomStudent)
          allGroups.push(groupName)
          cloned.splice(randomIndex, 1)
        } 
        else {
          allGroups[currentGroupIndex].push(randomStudent)
          cloned.splice(randomIndex, 1)
        }
    }
    return allGroups
  }

  
module.exports = randomGroup 


for(let i=0; i < finalTeams.length; i++){
  for(let j=0; j < finalTeams.length; j++) {
    if (finalTeams[i].sort().join(',') !== finalTeams[j].sort().join(',')) {
      reallyFinalTeams.push(finalTeams[i])
    }
  }
}