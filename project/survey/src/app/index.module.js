/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('survey', ['ui.router', 'ui.bootstrap', 'toastr'])
  .constant('malarkey', malarkey)    //变量
  .constant('moment', moment)
  .config(config)                   //配置
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController) //控制器
  .directive('acmeNavbar', NavbarDirective)     //指令
  .directive('acmeMalarkey', MalarkeyDirective);
