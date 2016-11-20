export class DeTailController {
  constructor ($timeout, surveyApi, $state, toastr, $log, $stateParams) {
    'ngInject';

    this.toastr = toastr;
    this.surveyApi = surveyApi;
    this.$log = $log;
    this.content = this.showQuestions($stateParams.id);
    console.log('content', $stateParams);
  }

  showQuestions(id, status) {
    console.log('-------', id);
    this.surveyData = this.surveyApi.getSurveyData();
    let content = '';
    this.surveyData.forEach((item) => {
      if(item.id == id){
        content = item;
      }
    });
    return content;
  }
  vote() {

  }
  save() {
    
  }
  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
