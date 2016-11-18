/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

import { filterQuestionType, filterSurveyType, filterSurveyOperation } from './filter/filter';
import { SurveyApi } from './services/api.js';
import { SurveyListController } from './controller/surveyList.js';
import { DeTailController } from './controller/detail.js';
import { DeleteSurveyController } from './controller/deleteSurvey.js';
angular.module('survey', ['ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)    //变量
  .constant('moment', moment)
  .config(config)                   //配置
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('surveyApi', SurveyApi)
  .filter('filterQuestionType', filterQuestionType)//过滤器
  .filter('filterSurveyType', filterSurveyType)
  .filter('filterSurveyOperation', filterSurveyOperation)
  .controller('MainController', MainController) //控制器
  .controller('SurveyListController', SurveyListController) //控制器
  .controller('DeleteSurveyController', DeleteSurveyController) //控制器
  .controller('DeTailController', DeTailController) //控制器
  .directive('acmeNavbar', NavbarDirective)     //指令
  .directive('acmeMalarkey', MalarkeyDirective);
