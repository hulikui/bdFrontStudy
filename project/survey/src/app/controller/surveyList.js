export class SurveyListController {
  constructor ($timeout, $log, surveyApi, $state, toastr, $uibModal) {
    'ngInject';

    this.surveyData = surveyApi.getSurveyData();
    this.toastr = toastr;
    this.state = $state;
    this.$uibModal = $uibModal;
    this.$log = $log;
  }

  showQuestions(id, status) {
    this.surveyData.forEach((item) => {
      if(item.id == id){
        this.state.go('detail',{id: id});
      }
    });
  }
  deleteSurvey(id) {
    $scope.id = id;
  console.log('deleteId', id);
  var modalInstance = this.$uibModal.open({
    templateUrl: 'deleteId',
    controller: 'DeleteSurveyController',
    size: null,
    resolve: {
      items: function () {
        return $scope.id;
      }
    }
  });
    this.$log.info(modalInstance);
  modalInstance.result.then(function(selectedItem) {
    $scope.selected = selectedItem;
  }, function() {
      console.log('===========', $scope.selected);
    });
  };
  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
