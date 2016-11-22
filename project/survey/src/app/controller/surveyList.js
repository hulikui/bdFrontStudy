export class SurveyListController {
  constructor ($timeout, $log, surveyApi, $state, toastr, $uibModal) {
    'ngInject';

    this.surveyData = surveyApi.getSurveyData();
    this.toastr = toastr;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.$log = $log;
  }
  deleteSelected() {
    const selectedId = [];
      this.surveyData.forEach((survey)=> {
        if(survey.selected){
          selectedId.push(survey.id);
        }
      });
    if(selectedId.length>0) this.deleteSurvey('所选选项', selectedId);
  }
  all(isSelected) {
    if(isSelected){
      this.surveyData.forEach((survey)=> {
        survey.selected = true;
      });
    }else {
      this.surveyData.forEach((survey)=> {
        survey.selected = false;
      });
    }
  }

  showQuestions(id) {
    this.surveyData.forEach((item) => {
      if(item.id == id){
        this.state.go('detail',{id: id});
      }
    });
  }
  detail(id, state) {
    if(state == 2) {
      this.$state.go('showvotes', {id});
    }else {
      this.$state.go('detail', {id,state});
    }
  }
  deleteSurvey(title, id) {
    const $scope = this;
    $scope.id = id;
    $scope.title = title;
  var modalInstance = this.$uibModal.open({
    templateUrl: 'deleteId',
    controller: 'DeleteSurveyController',
    size: 'sm',
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
    if(deleteId instanceof Array) {
      deleteId.forEach((id)=>{
        $scope.surveyData.forEach((item, index) => {
            if(item.id == id){
              $scope.surveyData.splice(index, 1);
              $scope.showToastr('删除问卷成功!' ,1)
            }
        });
      });
    }else{
      $scope.surveyData.forEach((item, index) => {
        if(item.id == deleteId){
          $scope.surveyData.splice(index, 1);
          $scope.showToastr('删除问卷成功!' ,1)
        }
      });
    }

  }, function() {

    });
  }
  showToastr(messsge, type) {
    if(type==0){
    this.toastr.info('<p>'+messsge+'</p>');
    }else if(type==1){
      this.toastr.warning('<p>'+messsge+'</p>');
    }
    this.classAnimation = '';
  }
}
