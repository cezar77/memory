import './style.scss';
import angular from 'angular';

const MODULE_NAME = 'memoryApp';

angular
  .module(MODULE_NAME, [])
  .controller('MemoryController', function($scope, $timeout) {
    var
      i,
      cards = [
        'cardAK',
        'cardAQ',
        'cardAJ',
        'cardBK',
        'cardBQ',
        'cardBJ',
      ],
      length = cards.length
    ;

    $scope.shuffle = function() {
      return 0.5 - Math.random();
    };

    $scope.deck = [];

    for (i = 0; i < length; i++) {
      $scope.deck.push({
        'name': cards[i],
        'piece': 1,
        'position': null,
        'flipped': false,
        'removed': false
      });
      $scope.deck.push({
        'name': cards[i],
        'piece': 2,
        'position': null,
        'flipped': false,
        'removed': false
      });
    }
    $scope.deck.sort($scope.shuffle);
    $scope.deck.forEach(function(element, index) {
      element.position = index;
    });

    $scope.selectedCards = [];
    $scope.selectCard = function() {
      if ($scope.selectedCards.length > 1) {
        return;
      }
      if (this.card.flipped) {
        return;
      }
      $scope.selectedCards.push(this.card);
      this.card.flipped = true;
      if ($scope.selectedCards.length == 2) {
        $timeout($scope.checkPattern, 1500);
      }
    };

    $scope.checkPattern = function() {
      if ($scope.selectedCards[0].name == $scope.selectedCards[1].name) {
        $scope.selectedCards[0].removed = true;
        $scope.selectedCards[1].removed = true;
      } else {
        $scope.selectedCards[0].flipped = false;
        $scope.selectedCards[1].flipped = false;
      }
      $scope.selectedCards = [];
    };
  })
;
