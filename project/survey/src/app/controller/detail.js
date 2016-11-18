export class DeTailController {
  constructor ($timeout, surveyApi, $state, toastr, $log, $stateParams) {
    'ngInject';

    this.surveyData = surveyApi.getSurveyData();
    this.toastr = toastr;
    this.$log = $log;
    this.content = this.showQuestions($stateParams.id);
    console.log('content', this.content);
  }

  showQuestions(id, status) {
    let content = '';
    this.surveyData.forEach((item) => {
      if(item.id == id){
        content = item;
      }
    });
    return content;
  }
  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
