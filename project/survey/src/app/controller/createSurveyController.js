export class CreateSurveyController {
  constructor ($scope, $timeout, $log, surveyApi, $state, toastr, $stateParams, $uibModal) {
    'ngInject';

    this.surveyApi = surveyApi;
    this.toastr = toastr;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.$stateParams = $stateParams;
    this.date = new Date();
    this.minDate = new Date();
    this.questObj = this.showQuestions($stateParams.id);
    this.questions = this.questObj.questions || [];
    this.$scope = $scope;
    this.$timeout=$timeout;
  }

  showQuestions(id) {
    this.surveyData = this.surveyApi.getSurveyData();
    let content = '';
    this.surveyData.forEach((item) => {
      if(item.id === parseInt(id)){
        content = item;
      }
    });
    return content;
  }

  delete(id) {
   this.questions.splice(id,1);
  }
  copy(id) {
    this.questions.push(this.questions[id]);
  }
  up(id){
    const cur=this.questions[id];
    const pre=this.questions[id-1];
    this.$timeout(()=>{
      this.questions[id]=pre;
      this.questions[id-1]=cur;
      this.questions[id].id = id;
      this.questions[id-1].id = id-1;
    });

  }
  down(id){
    const cur=this.questions[id];
    const next=this.questions[id+1];
      this.$timeout(()=>{
        this.questions[id]=next;
        this.questions[id+1] = cur;
        this.questions[id].id = id;
        this.questions[id+1].id = id+1;
      }, 400);

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
  getFormData(formData, state, id){
    const survey = {
      id,
      title: formData.survey_title.$modelValue,
      time: new Date(),
      endTime: this.date,
      questions: [],
      state
    };
    for (let item in formData) {
        const obj = item.split('_');
        const id = parseInt(obj[0]);
        const type = parseInt(obj[1]);
        const value = formData[item];
        const quest = survey.questions[id];
        if(obj[2] == 'title' && !quest){//title 且 没插入
          const question = {
            id,
            type,
            question: value.$modelValue,
            content: [],
            voteNums: [0, 0, 0, 0],
            totalVotes: 0
          };
          if(type == 2 ) question.voteNums = [];
          survey.questions[id] = question;
        } else if(obj[2] == 'title' && quest) {// question 已插入 修改
          quest.question = value.$modelValue;
        }else if ((obj[2] == 'option' || obj[2] == 'text') && !quest){
          const question = {
            id,
            type,
            question: '',
            content: [],
            voteNums: [0,0,0,0],
            totalVotes: 0
          };
          if(type == 2 ) question.voteNums = [];
          question.content.push(value.$modelValue);
          survey.questions[id] = question;
        }else if((obj[2] == 'option' || obj[2] == 'text') && quest){ // 为option的时候 证明是选项 定位 然后插入
          survey.questions[id].content.push(value.$modelValue);
        }
    }
    return survey;
  }
  add(state) {
    if(this.date.getDay() <= this.minDate.getDay()){
      this.showToastr('截止日期小于当前天', 0);
      return;
    }
    const form = this.$scope.form;
    const surveys = this.surveyApi.getSurveyData();
    const id = this.$stateParams.id || surveys[surveys.length-1].id + 1;
    const survey = this.getFormData(form, state, id);
    if(survey.questions.length>0){

        this.surveyApi.setSurveyData(survey, id);
      if(state == 0){
        this.showToastr('保存成功', 1);
      }else{
        this.showToastr('发布成功', 1);
      }
      this.$state.go('list');
    }else{
      this.showToastr('请选择问题类型并填写', 0);
      return;
    }

  }
  showToastr(message, type) {
    if(type == 0){
      this.toastr.warning('<p>'+message+'</p>');
    }else {
      this.toastr.success('<p>'+message+'</p>');
    }

    this.classAnimation = '';
  }
}
