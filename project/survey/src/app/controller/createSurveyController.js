export class CreateSurveyController {
  constructor ($scope, $timeout, $log, surveyApi, $state, toastr, $stateParams, $uibModal) {
    'ngInject';

    this.surveyApi = surveyApi;
    this.toastr = toastr;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.$stateParams = $stateParams;
    this.typeDisplay = false;
    this.questObj = this.showQuestions($stateParams.id);
    this.questions = this.questObj.questions || [];
    this.$scope = $scope;
    console.log('fo11111111111rm' ,this.questObj);
  }

  showQuestions(id) {
    console.log('-------', id);
    this.surveyData = this.surveyApi.getSurveyData();
    let content = '';
    this.surveyData.forEach((item) => {
      if(item.id === parseInt(id)){
        content = item;
      }
    });
    console.log('content', content);
    return content;
  }

  showType() {
    if(!this.typeDisplay){
      this.typeDisplay = true;
    }else{
      this.typeDisplay = false;
    }
  }
  addRadio() {
    const obj = {
      id: this.questions.length,
      type: 0,
      question: '',
      content: ['']
    };
    this.questions.push(obj);//存储题型
  }
  addMuti() {
    const obj = {
      id: this.questions.length,
      type: 1,
      question: '',
      content: ['']
    };
    this.questions.push(obj);
  }
  addText() {
    const obj = {
      id: this.questions.length,
      type: 2,
      question: '',
      content: ['']
    };
    this.questions.push(obj);
  }
  getFormData(formData, id){
    console.log('===============', id);
    const survey = {
      id,
      title: formData.survey_title.$modelValue,
      time: new Date(),
      endTime: formData.endTime.$modelValue,
      questions: [],
      state: 1,
    };
    for (let item in formData) {
        const obj = item.split('_');
        const id = parseInt(obj[0]);
        const value = formData[item];
        const quest = survey.questions[id];
        if(obj[2] == 'title' && !quest){//title 且 没插入
          const question = {
            id,
            type: parseInt(obj[1]),
            question: value.$modelValue,
            content: []
          };
          survey.questions[id] = question;
        } else if(obj[2] == 'title' && quest) {// question 已插入 修改
          quest.question = value.$modelValue;
        }else if ((obj[2] == 'option' || obj[2] == 'text') && !quest){
          const question = {
            id,
            type: parseInt(obj[1]),
            question: '',
            content: []
          };
          question.content.push(value.$modelValue);
          survey.questions[id] = question;
        }else if((obj[2] == 'option' || obj[2] == 'text') && quest){ // 为option的时候 证明是选项 定位 然后插入
          survey.questions[id].content.push(value.$modelValue);
        }
    }
    console.log('getformData', survey);
    return survey;
  }
  add(state) {
    console.log('=====submit====', this.$scope.form);//name 表示 index_type_title

    const form = this.$scope.form;
    const surveys = this.surveyApi.getSurveyData();
    const id = this.$stateParams.id || surveys[surveys.length-1].id + 1;
    console.log('=====id========', this.$stateParams.id, surveys[surveys.length-1].id + 1, id);
    const survey = this.getFormData(form, id);

    //const survey = {
    //  id,
    //  title: form.survey_title.$modelValue,
    //  time: new Date(),
    //  endTime: form.endTime.$modelValue,
    //  questions: [],
    //  state,
    //};
    //
    //formData.forEach(function (item, index) {
    //  if(index>0){
    //    const obj = item.$name.split('_');
    //    const id = parseInt(obj[0]);
    //    const quest = survey.questions[id];
    //    if(obj[2] == 'title' && !quest){//title 且 没插入
    //      const question = {
    //        id,
    //        type: parseInt(obj[1]),
    //        question: item.$modelValue,
    //        content: []
    //      };
    //      survey.questions[id] = question;
    //    } else if(obj[2] == 'title' && quest) {// question 已插入 修改
    //      quest.question = item.$modelValue;
    //    }else if(obj[2] == 'option' || obj[2] == 'text'){ // 为option的时候 证明是选项 定位 然后插入
    //      survey.questions[id].content.push(item.$modelValue);
    //    }
    //  }
    //});
    console.log('=====surveysurvey===', survey);
    if(survey.questions.length>0){

        this.surveyApi.setSurveyData(survey, id);
        this.showToastr('保存成功');

      //if(state == 0){
      //  this.showToastr('保存成功');
      //}else{
      //  this.showToastr('发布成功');
      //}
      this.$state.go('list');
    }else{
      this.showToastr('请选择问题类型并填写');
    }

    // const item = {
    //   id: i,
    //   title: '这是我的第' + i + '份问卷',
    //   time: GetNowDateTime(new Date()),
    //   state: parseInt(Math.random() * 3),
    //   questions: {
    //     id: i,
    //     question: '问题' + i,
    //     type: parseInt(Math.random() * 3),
    //     content: ['选项一', '选项二', '选项三', '选项四']
    //   }
    //
    // };
  }
  showToastr(message) {
    this.toastr.info('<p>'+message+'</p>');
    this.classAnimation = '';
  }
}
