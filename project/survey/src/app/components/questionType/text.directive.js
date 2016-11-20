export function TextDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/questionType/text.html',
    scope: {
      creationDate: '='
    },
    link: linkFunc,
    controller: TextController,
    controllerAs: 'vm',
    bindToController: true
  };
  function linkFunc(scope, el, attr, vm) {
    let typeNum = attr.id.split('_')[1];//获取类型
    let index = attr.id.split('_')[0];//获取题号
    vm.typeNum = typeNum;
    let type='';
    if(typeNum == '0'){
      type='单选题';
    }else if(typeNum=='1'){
      type="多选题";
    }else{
      type="文本题";
    }
    vm.type = type;
    vm.index = index;

  }
  return directive;
}

class TextController {
  constructor(moment) {
    'ngInject';
    this.count = 0;
    //获取界面单选题数据
  }
}

