export function RadioDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/questionType/radio.html',
    scope: {
      creationDate: '='
    },
    link: linkFunc,
    controller: RadioController,
    controllerAs: 'vm',
    bindToController: true
  };
  function linkFunc(scope, el, attr, vm) {
   console.log('获取模板属性', vm);
    let typeNum = attr.id.split('_')[1];//获取类型
    let index = attr.id.split('_')[0];//获取题号
    vm.typeNum = typeNum;
    let type = '';
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

class RadioController {
  constructor (moment) {
    'ngInject';
    this.count = 1;
    this.type = '单选题';
    this.selects=[1];
    this.index = '1';
    //获取界面单选题数据
    //ng-model 按照 题号_type_{title, select_1, select_2}生成
    console.log('=======', this)
  }
  add() {
    if(this.count>=5){
      return;
    }
    this.count ++;
    this.selects.push(this.count);
  }
  reduce() {
    if(this.count == 1){
      return;
    }
    this.count--;
    this.selects.pop();
  }
}
