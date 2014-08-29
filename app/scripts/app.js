'use strict';

/**
 * @ngdoc overview
 * @name memoryGameApp
 * @description
 * # memoryGameApp
 *
 * Main module of the application.
 */
var app = angular
  .module('memoryGameApp', ['ngAnimate']);


app.factory('GameData', function() {

  var  srcsImg = [
    'scarlette',
    'batman',
    'bean',
    'britney',
    'dragon',
    'lara',
    'wom',
    'happy'
  ];

  var gd = {
    cardsArray : [],
    cardsLeft : 8,
    score : 0,
    hiddenCardUrl: 'images/hidden.png'
  };

  gd.initArray = function(size) {
    if (gd.cardsArray.length) { gd.cardsArray = []; }

    gd.cardsLeft = size / 2;
    angular.forEach(srcsImg, function(element) {
      var it = 0;
      var i = 0;
      while (it < (size / srcsImg.length)) {
        if (gd.cardsArray[i = Math.floor(Math.random() * size)] === undefined) {
          gd.cardsArray[i] = {
            name: element,
            imgUrl : 'images/' + element + '.jpg',
            flipped : false,
            validated : false
          };
          ++it;
        }
      }
    });
  };

  return gd;
});


app.directive('board', function() {
  return {
    restrict: 'EA',
    templateUrl: 'views/board.html'
  };
});