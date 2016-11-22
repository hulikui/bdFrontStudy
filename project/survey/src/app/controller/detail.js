export class DeTailController {
  constructor ($scope, $timeout, surveyApi, $state, toastr, $log, $stateParams) {
    'ngInject';

    this.toastr = toastr;
    this.surveyApi = surveyApi;
    this.$log = $log;
    this.$scope = $scope;
    this.content = this.showQuestions($stateParams.id, $stateParams.state);
    this.$state = $state;
    console.log('content', $stateParams);
  }

  showQuestions(id, status) {
    console.log('-------', id);
    this.surveyData = this.surveyApi.getSurveyData();
    let content = [];
    this.surveyData.forEach((item) => {
      if(item.id == id){
        content = item;
      }
    });
    // id,
    //   type: parseInt(obj[1]),
    //   question: '',
    //   content: []
    content.questions.forEach((item) =>{
      if(item.type == 0 ){
        item.votes = 0;
      }else if(item.type == 1){

          item.votes=[false, false, false, false];
      }else {

          item.votes='';
      }
    });
    return content;
  }
  change(el) {
    console.log('========',this.$scope,el);
  }
  vote() {
    console.log('==============', this.$scope)
    console.log('this.content.questions',this.content.questions);
    this.surveyApi.setSurveyVote(this.content.questions, this.content.id);
    this.$state.go('showvotes',{id: this.content.id});
  }
  save() {

  }
  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
