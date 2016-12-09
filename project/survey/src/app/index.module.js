/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

import { filterQuestionType, filterSurveyType, filterSurveyOperation, getFormatTime, getTagName, getInputName, getProbarName, getQuestTypeStyle } from './filter/filter';
import { SurveyApi } from './services/api.js';
import { SurveyListController } from './controller/surveyList.js';
import { DeTailController } from './controller/detail.js';
import { DeleteSurveyController } from './controller/deleteSurvey.js';
import { CreateSurveyController } from './controller/createSurveyController';
import { RadioDirective } from './components/questionType/radio.directive';
import { TextDirective } from './components/questionType/text.directive';
import { ShowVotesController } from './controller/showVotesController.js';

angular.module('survey', ['ui.router', 'ui.bootstrap', 'toastr', 'chart.js'])
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
  .filter('getFormatTime', getFormatTime)
  .filter('getTagName', getTagName)
  .filter('getInputName', getInputName)
  .filter('getProbarName', getProbarName)
  .filter('getQuestTypeStyle', getQuestTypeStyle)
  .controller('MainController', MainController) //控制器
  .controller('SurveyListController', SurveyListController) //控制器
  .controller('DeleteSurveyController', DeleteSurveyController) //控制器
  .controller('DeTailController', DeTailController) //控制器
  .controller('CreateSurveyController', CreateSurveyController) //控制器
  .controller('ShowVotesController', ShowVotesController) //控制器
  .directive('acmeNavbar', NavbarDirective)     //指令
  .directive('acmeMalarkey', MalarkeyDirective)
  .directive('textQuestion', TextDirective)
  .directive('radioQuestion', RadioDirective);

