var surveys = [];

function getQuestions() {
  const questions = [];
  for(let i=0;i<10;i++){
    const item = {
      id: i,
      question: '问题' + i,
      type: parseInt(Math.random()*3),
      content: ['选项一', '选项二', '选项三', '选项四']
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
function setData(data) {
  surveys.push(data);
}

export {
  getData,
  setData
}
