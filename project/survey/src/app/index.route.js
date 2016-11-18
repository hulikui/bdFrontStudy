export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('list', {
      url: '/list',
      templateUrl: 'app/views/list.html',
      controller: 'SurveyListController',
      controllerAs: 'list'
    })
    .state('detail', {
      url: '/detail/{id}',
      templateUrl: 'app/views/detail.html',
      controller: 'DeTailController',
      controllerAs: 'detail'
    });

  $urlRouterProvider.otherwise('/');
}
