export class DeTailController {
  constructor ($scope, $timeout, surveyApi, $state, toastr, $log, $stateParams) {
    'ngInject';

    this.toastr = toastr;
    this.surveyApi = surveyApi;
    this.$log = $log;
    this.$scope = $scope;
    this.content = this.showQuestions($stateParams.id, $stateParams.state);
    this.$state = $state;
  }

  showQuestions(id) {
    this.surveyData = this.surveyApi.getSurveyData();
    let content = [];
    this.surveyData.forEach((item) => {
      if(item.id == id){
        content = item;
      }
    });
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
  vote() {
    this.surveyApi.setSurveyVote(this.content.questions, this.content.id);
    this.showToastr();
  }
  showToastr() {
    this.toastr.success('<p>投票成功</p>');
    this.classAnimation = '';
  }
}
