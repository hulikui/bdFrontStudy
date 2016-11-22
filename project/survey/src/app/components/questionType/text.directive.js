export function TextDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/questionType/text.html',
    scope: {
      getQuestion: '&'
    },
    link: linkFunc,
    controller: TextController,
    controllerAs: 'vm',
    bindToController: true
  };
  function linkFunc(scope, el, attr, vm) {
    const obj = vm.getQuestion();
    vm.obj = obj;
  }
  return directive;
}

class TextController {
  constructor() {
    'ngInject';
    this.count = 0;
    //获取界面单选题数据
  }
}

