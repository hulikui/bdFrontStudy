export class CreateSurveyController {
  constructor ($scope, $timeout, $log, surveyApi, $state, toastr, $uibModal) {
    'ngInject';

    this.surveyApi = surveyApi;
    this.toastr = toastr;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.typeDisplay = false;
    this.questNum = 0;
    this.questTypes = [];
    this.$scope = $scope;
    //console.log('form' ,$scope);
  }

  showType() {
    if(!this.typeDisplay){
      this.typeDisplay = true;
    }else{
      this.typeDisplay = false;
    }
  }
  addRadio() {
    this.questTypes.push(0);//存储题型
  }
  addMuti() {
    this.questTypes.push(1);
  }
  addText() {
    this.questTypes.push(2);
  }
  add(state) {
    console.log('=====submit====', this.$scope.form);//name 表示 index_type_title

    const form = this.$scope.form;
    const formData = form.$$success.parse;

    if(!formData||!form.survey_title.$modelValue){
      return;
    }
    const surveys = this.surveyApi.getSurveyData();
    const id = surveys[surveys.length-1].id + 1;
    const survey = {
      id,
      title: form.survey_title.$modelValue,
      time: new Date(),
      endTime: form.endTime.$modelValue,
      questions: [],
      state,
    };

    formData.forEach(function (item, index) {
      if(index>0){
        const obj = item.$name.split('_');
        const id = parseInt(obj[0]);
        if(obj[2] == 'title'){//为title时 更新问题 插入
          const question = {
            id,
            type: parseInt(obj[1]),
            question: item.$modelValue,
            content: []
          };
          survey.questions[id - 1] = question;
        }else if(obj[2] == 'option' || obj[2] == 'text'){ // 为option的时候 证明是选项 定位 然后插入
          survey.questions[id - 1].content.push(item.$modelValue);
        }
      }
    });

    if(survey.questions.length>0){
      this.surveyApi.setSurveyData(survey);
      if(state == 0){
        this.showToastr('保存成功');
      }else{
        this.showToastr('发布成功');
      }

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
