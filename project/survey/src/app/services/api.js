import { getData, setData, setVote  } from '../config/surveyData.js';
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
  setSurveyData(data, id) {
    return setData(data, id);
  }
  setSurveyVote(data, id){
    return setVote(data, id);
  }
}
