'use strict';

/**
 * @ngdoc function
 * @name memoryGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the memoryGameApp
 */
angular.module('memoryGameApp')
  .controller('GameController', function ($scope, GameData, $timeout) {
    var alreadyFlipped = null;
    var wait = false;
    var speed = 2000;
    var size = 16;

    var flipCard = function(card) {
      if (!card.validated && !wait && card !== alreadyFlipped) {
        if (alreadyFlipped !== null) {
          card.flipped = !card.flipped;
          if (alreadyFlipped.name === card.name) {
            alreadyFlipped.validated = true;
            card.validated = true;
            --$scope.cardsLeft;
            alreadyFlipped = null;
            $scope.score += 5;
          }
          else {
            wait = true;
            if ($scope.score > 0) { --$scope.score; }
            $timeout(function() {
              alreadyFlipped.flipped = false;
              card.flipped = false;
              alreadyFlipped = null;
              wait = false;
            }, speed);
          }
        }
        else {
          alreadyFlipped = card;
          card.flipped = !card.flipped;
        }
      }
    };

    var endGame = function(user) {
      if (!$scope.cardsLeft) {
        $scope.greetings = true;
        $scope.startGame = true;
      }
      else if (user === true) {
        $scope.startGame = true;
      }
    };

    var initGame = function() {
      GameData.initArray(size);
      $scope.cards = GameData.cardsArray;
      $scope.greetings = false;
      $scope.startGame = false;
      $scope.cardsLeft = GameData.cardsLeft;
      $scope.perRow = size / 4;
    };

    var setSize = function(s) {
      size = s;
    };

    var setSpeed = function(s) {
      speed = s;
    };

    $scope.counterArr = [0,1,2,3];
    $scope.score = GameData.score;
    $scope.hiddenImageUrl = GameData.hiddenCardUrl;
    $scope.flipCard = flipCard;
    $scope.initGame = initGame;
    $scope.greetings = false;
    $scope.endGame = endGame;
    $scope.startGame = true;
    $scope.setSize = setSize;
    $scope.setSpeed = setSpeed;
});
