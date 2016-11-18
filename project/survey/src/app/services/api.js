import { getData } from '../config/surveyData.js';
export class SurveyApi {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
  }

  getSurveyData() {
    return getData();
  }
}
