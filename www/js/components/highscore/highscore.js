var module = angular.module('highscoreModule', []);
module.controller('HighscoreCtrl', function($scope, HighscoreService) {
  ons.ready(function() {
    // Init code here
    $scope.highscore = HighscoreService.getList();
  });
});
