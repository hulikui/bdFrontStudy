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
      url: '/detail/:id/:state',
      templateUrl: 'app/views/detail.html',
      controller: 'DeTailController',
      controllerAs: 'detail'
    })
    .state('create', {
      url: '/create/:id',
      templateUrl: 'app/views/create.html',
      controller: 'CreateSurveyController',
      controllerAs: 'create'
    });

  $urlRouterProvider.otherwise('/');
}
