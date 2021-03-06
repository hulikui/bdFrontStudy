var surveys = [];
function geneVotes(nums) {
  let count = 0;
  const votes = [];
  for(let i=0;i<nums;i++){
    const a = Math.floor(Math.random()*50);
    count+=a;
    votes.push(a);
  }
  return {
    count,
    votes
  }
}
function getQuestions() {
  const questions = [];
  for(let i=0;i<10;i++){
    const type = parseInt(Math.random()*3);
    const voteObj = geneVotes(4);
    if(type == 2){
      voteObj.votes=['选项一', '22222'];
    }
    const item = {
      id: i,
      question: '问题' + i,
      type,
      content: ['选项一', '选项二', '选项三', '选项四'],
      voteNums: voteObj.votes,  //投票数
      totalVotes: voteObj.count
    };
    questions.push(item);
  }
  return questions;
}
function generteData() {
  const questions = getQuestions();
  for(let i=0;i<10;i++){
    const item = {
      id: i,
      title: '这是我的第'+i+'份问卷',
      time: new Date(),
      state: parseInt(Math.random()*3),
      questions
    };
    surveys.push(item);
  }
  return surveys;
}

generteData();
function getData() {
  return surveys;
}
function setData(data, id) {
  let index = parseInt(id);
  let isExist = false;
  surveys.forEach((item) => {
    if(index === item.id){
      isExist = true;
    }
  });
  if(!isExist){
    surveys.push(data);
  }else{
    surveys[id] = data;
  }

}

function setVote(data, id) {
  let index = 0;
  surveys.forEach((item, i)=>{
    if(id == item.id){
      index = i;
    }
  });
    data.map((item, a)=>{
    const votes = surveys[index].questions[a].voteNums;
    if(item.type == 0){
      const vote_index = parseInt(item.votes);
      const nums = votes[vote_index] || 0;
      votes[vote_index] = nums + 1;
      surveys[index].questions[a].totalVotes +=1.;
    }else if(item.type == 1){
      item.votes.forEach((item, i) => {
        if(item){
          const nums = votes[i] || 0;
          votes[i] = nums+1;
          surveys[index].questions[a].totalVotes +=1 ;
        }
      });
    }else {
      if(item.votes.length>1){
        votes.push(item.votes);
      }
      surveys[index].questions[a].totalVotes +=1 ;
    }
  });
}

export {
  getData,
  setData,
  setVote
}
