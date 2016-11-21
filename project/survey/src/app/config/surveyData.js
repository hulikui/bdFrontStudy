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
function setData(data, id) {
  let index = parseInt(id);
  let isExist = false;
  surveys.forEach((item) => {
    console.log(item.id, index);
    if(index === item.id){
      isExist = true;
    }
  });
  if(!isExist){
    surveys.push(data);
    console.log('保存成', surveys);
  }else{
    console.log('更新成功', surveys);
    surveys[id] = data;
  }

}

function setVote(data) {

}

export {
  getData,
  setData
}
