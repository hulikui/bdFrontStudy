export class ShowVotesController {
  constructor ($scope, $timeout, surveyApi, $state, toastr, $log, $stateParams) {
    'ngInject';

    this.toastr = toastr;
    this.surveyApi = surveyApi;
    this.$log = $log;
    this.$scope = $scope;
    this.content = this.showQuestions($stateParams.id);
  }

  showQuestions(id) {
    this.surveyData = this.surveyApi.getSurveyData();
    let content = [];
    this.surveyData.forEach((item) => {
      if(item.id == id){
        content = item;
      }
    });
    return content;
  }
}
