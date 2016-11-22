export function MalarkeyDirective(malarkey) {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
        extraValues: '='
    },
    template: '&nbsp;',
    link: linkFunc,
    controller: MalarkeyController,
    controllerAs: 'vm'
  };

  return directive;

  function linkFunc(scope, el) {
    let typist = malarkey(el[0], {
      typeSpeed: 40,
      deleteSpeed: 40,
      pauseDelay: 800,
      loop: true,
      postfix: ' '
    });

    el.addClass('acme-malarkey');

    angular.forEach(scope.extraValues, (value) => {
      typist.type(value).pause().delete();
    });

  }

}

class MalarkeyController {
  constructor ($log, githubContributor) {
    'ngInject';

    this.$log = $log;
    this.contributors = [];

    this.activate(githubContributor);
  }

  activate(githubContributor) {
    return this.getContributors(githubContributor).then(() => {
      this.$log.info('Activated Contributors View');
    });
  }

  getContributors(githubContributor) {
    return githubContributor.getContributors(10).then((data) => {
      this.contributors = data;

      return this.contributors;
    });
  }
}
