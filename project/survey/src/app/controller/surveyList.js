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
    this.$log.info('===detail==', id);
    this.surveyData.forEach((item) => {
      if(item.id == id){
        this.state.go('detail',{id: id});
      }
    });
  }
  deleteSurvey(title, id) {
    const $scope = this;
    $scope.id = id;
    $scope.title = title;
    this.$log.info('====', this.surveyData);
  var modalInstance = this.$uibModal.open({
    templateUrl: 'deleteId',
    controller: 'DeleteSurveyController',
    size: null,
    controllerAs: 'delete',
    resolve: {
      items: function () {
        return {
          id: $scope.id,
          title: $scope.title
        };
      }
    }
  });
    $scope.$log.info(modalInstance);
  modalInstance.result.then(function(deleteId) {
    $scope.selected = deleteId;
    console.log('选择删除的Id为:', deleteId);
    $scope.surveyData.forEach((item, index) => {
      if(item.id == deleteId){
        $scope.surveyData.splice(index, 1);
        $scope.showToastr('删除问卷成功!' ,1)
      }
    });
  }, function() {
      console.log('===========', $scope.selected);
    });
  };
  showToastr(messsge, type) {
    if(type==0){
    this.toastr.info('<p>'+messsge+'</p>');
    }else if(type==1){
      this.toastr.warning('<p>'+messsge+'</p>');
    }
    this.classAnimation = '';
  }
}
