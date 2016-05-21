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
      level: 1,
      timerCountDown: 3000,
      timerInterval: 3
    };
    $scope.clickNumber = function(number) {
      if (number === $scope.game.randomNumber) {
        $scope.game.currentPoints++;
        if ($scope.game.currentPoints % 10 === 0) {
          raiseLevel();
        }
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
          HighscoreService.addHighscore(name || 'unknown', $scope.game.currentPoints);
          navigation.setMainPage('highscore.html', {closeMenu: true});
        }
      });
    }

    function setTimer() {
      $scope.game.countDown = $scope.game.timerInterval;
      $scope.game.interval = $interval(function() {
        $scope.game.countDown--;
        if ($scope.game.countDown === 0) {
          $interval.cancel($scope.game.interval);
        }
      }, 1000, 0);
      return $timeout(function() {
        $scope.clickNumber(0);
      }, $scope.game.timerCountDown);
    }

    function raiseLevel() {
      $scope.game.level++;
      switch ($scope.game.level) {
        case 2:
          $scope.game.timerCountDown = 2000;
          $scope.game.timerInterval = 2;
          break;
        case 3:
          $scope.game.timerCountDown = 1000;
          $scope.game.timerInterval = 1;
          break;
        default:
          $scope.game.timerCountDown = 1000;
          $scope.game.timerInterval = 1;
      }
    }

  });
});
