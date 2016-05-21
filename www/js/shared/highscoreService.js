var module = angular.module('highscoreModule');
module.factory('HighscoreService', function(localStorageService) {

  var service = {};

  service.highscore = localStorageService.get('highscore') || [];

  service.getList = function () {
    return service.highscore;
  };

  service.addHighscore = function (name, points) {
    service.highscore.push({name: name, points: points});
    localStorageService.set('highscore', service.highscore);
  };

  return {
    getList: function () {
      return service.getList();
    },
    addHighscore: function (name, points) {
      return service.addHighscore(name, points);
    }
  };

});
