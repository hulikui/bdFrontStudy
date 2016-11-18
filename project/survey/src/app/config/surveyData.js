
function GetNowDateTime(nowTime) {
  var NowDateTime = nowTime.getFullYear() + "年" +
    (nowTime.getMonth() + 1 ) + "月" +
    nowTime.getDate() + "日" +
    " " +
    nowTime.getHours() + ":" +
    (nowTime.getMinutes()<10 ? '0'+ nowTime.getMinutes(): nowTime.getMinutes()) + ":" +
    (nowTime.getSeconds()<10 ? '0'+ nowTime.getSeconds(): nowTime.getSeconds());
  return NowDateTime;
}

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
function getData() {
  const questions = getQuestions();
  const surveys = [];
  for(let i=0;i<10;i++){
    const item = {
      id: i,
      title: '这是我的第'+i+'份问卷',
      time: GetNowDateTime(new Date()),
      state: parseInt(Math.random()*3),
      questions
    };
    surveys.push(item);
  }
  return surveys;
}

export {
  getData
}
