var module = angular.module('gameModule', ['highscoreModule']);
module.controller('GameCtrl', function($scope, $timeout, $interval, HighscoreService) {
  ons.ready(function() {
    $scope.game = {
      gameRunning: false,
      randomNumber: 1,
      startGame: function() {
        $scope.game.gameRunning = true;
        $scope.game.timer = setTimer();
        generateNewRandomNumber();
      },
      currentPoints: 0,
    };
    $scope.clickNumber = function(number) {
      if (number === $scope.game.randomNumber) {
        $scope.game.currentPoints++;
        $timeout.cancel($scope.game.timer);
        $interval.cancel($scope.game.interval);
        $scope.game.timer = setTimer();
        generateNewRandomNumber();
      } else {
        $timeout.cancel($scope.game.timer);
        $interval.cancel($scope.game.interval);
        gameOver();
      }
    };

    function generateNewRandomNumber() {
      $scope.game.randomNumber = Math.floor(Math.random() * 9) + 1;
    }

    function gameOver() {
      ons.notification.prompt({
        message: 'Congratulations! You have reached ' + $scope.game.currentPoints + ' points! Please put in your Name for the highscore!',
        title: 'You Won!',
        buttonLabel: 'OK',
        animation: 'default', // or 'none'
        callback: function(name) {
          HighscoreService.addHighscore(name, $scope.game.currentPoints);
          $scope.game.currentPoints = 0;
          $scope.game.gameRunning = false;
        }
      });
    }

    function setTimer() {
      $scope.game.countDown = 3;
      $scope.game.interval = $interval(function() {
        $scope.game.countDown--;
        if ($scope.game.countDown === 0) {
          $interval.cancel($scope.game.interval);
        }
      }, 1000, 0);
      return $timeout(function() {
        $scope.clickNumber(0);
      }, 3000);
    }

  });
});
