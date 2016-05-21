var module = angular.module('highscoreModule', []);
module.controller('HighscoreCtrl', function($scope, HighscoreService) {
  ons.ready(function() {
    // Init code here
    $scope.highscore = HighscoreService.getList();

    // $scope.MyDelegate = {
    //   configureItemScope: function(index, itemScope) {
    //     itemScope.item = {
    //       name: $scope.highscore[index].name + ' - (' + $scope.highscore[index].points + ')'
    //     };
    //   },
    //   calculateItemHeight: function(index) {
    //     return 40;
    //   },
    //   countItems: function() {
    //     return $scope.highscore.length;
    //   },
    //   destroyItemScope: function(index, scope) {
    //     console.log("Destroyed item #" + index);
    //   }
    // };

  });
});
