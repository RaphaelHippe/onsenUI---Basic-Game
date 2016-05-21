var module = angular.module('highscoreModule');
module.factory('HighscoreService', function() {

  var service = {};

  service.highscore = [];

  service.getList = function () {
    return service.highscore;
  };

  service.addHighscore = function (name, points) {
    service.highscore.push({name: name, points: points});
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
