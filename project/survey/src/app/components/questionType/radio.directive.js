export function RadioDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/questionType/radio.html',
    scope: {
      i: '=',
      getQuestion: '&'
    },
    link: linkFunc,
    controller: RadioController,
    controllerAs: 'vm',
    bindToController: true
  };
  function linkFunc(scope, el, attr, vm) {
    const obj = vm.getQuestion();
    vm.obj = obj;
  }
    return directive;
}

class RadioController {
  constructor ($scope,$interval) {
    'ngInject';
    this.type = '单选题';
    this.$scope=$scope;
    //this.index = '1';
    //获取界面单选题数据
    //ng-model 按照 题号_type_{title, select_1, select_2}生成
    $interval(()=>{
      const obj = $scope.vm.getQuestion();
      this.obj = obj;
    },500);
  }
  add() {
    this.obj.content.push('');
  }
  reduce() {
    this.obj.content.pop();
  }
}
