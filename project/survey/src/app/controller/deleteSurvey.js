export class DeleteSurveyController {
  constructor (surveyApi, $state, toastr, $uibModalInstance, items) {
    'ngInject';
    console.log('====111111',items);
    this.surveyData = surveyApi.getSurveyData();
    this.toastr = toastr;
    this.state = $state;
    this.$uibModalInstance = $uibModalInstance;
    this.items = items;
  }

  ok () {
    //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值

    this.$uibModalInstance.close(this.items.id);
  };

  cancel() {
    //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
    this.$uibModalInstance.dismiss('cancel');
  };

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
