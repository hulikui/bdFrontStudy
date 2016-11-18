function filterSurveyType(){
  return function(input){
    let output;
    switch (input){
      case 0:
        output = '未发布';
        break;
      case 1:
        output = '发布中';
        break;
      case 2:
        output = '已发布';
        break;
      default:
        output = '未发布';
    }
    return output;
  }
}

function filterQuestionType(){
  return function(input){
    let output;
    switch (input){
      case 0:
        output = '单选题';
        break;
      case 1:
        output = '多选题';
        break;
      case 2:
        output = '文本题';
        break;
      default:
        output = '单选题';
    }
    return output;
  }
}

function filterSurveyOperation(){
  return function(input){
    let output;
    switch (input){
      case 0:
        output = '查看数据';
        break;
      case 1:
        output = '查看问卷';
        break;
      case 2:
        output = '查看数据';
        break;
      default:
        output = '查看数据';
    }
    return output;
  }
}

export { filterQuestionType, filterSurveyType, filterSurveyOperation}
