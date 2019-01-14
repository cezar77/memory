import './style.css';
import angular from 'angular';

const MODULE_NAME = 'memoryApp';

angular
  .module(MODULE_NAME, [])
  .controller('MemoryController', function($scope) {
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

    $scope.deck = [];

    for (i = 0; i < length; i++) {
      $scope.deck.push({
        'name': cards[i],
        'piece': 1,
        'position': null
      });
      $scope.deck.push({
        'name': cards[i],
        'piece': 2,
        'position': null
      });
    }
    $scope.deck.sort(shuffle);
    $scope.deck.forEach(function(element, index) {
        element.position = index;
    });
  })
;

function shuffle() {
  return 0.5 - Math.random();
}

function selectCard() {
  if ($('.card-flipped').length > 1) {
    return;
  }
  $(this).addClass('card-flipped');
  if ($('.card-flipped').length == 2) {
    setTimeout(checkPattern, 700);
  }
}

function checkPattern() {
  if (isMatchPattern()) {
    $('.card-flipped').removeClass('card-flipped').addClass('card-removed');
    $('.card-removed').bind('webkitTransitionEnd', removeTookCards);
  } else {
    $('.card-flipped').removeClass('card-flipped');
  }
}

function isMatchPattern() {
  var cards = $('.card-flipped');
  var pattern = $(cards[0]).data('pattern');
  var anotherPattern = $(cards[1]).data('pattern');
  return (pattern == anotherPattern);
}

function removeTookCards() {
  $('.card-removed').remove();
}

//var matchingGame = {};
//matchingGame.deck = [
//  'cardAK', 'cardAK',
//  'cardAQ', 'cardAQ',
//  'cardAJ', 'cardAJ',
//  'cardBK', 'cardBK',
//  'cardBQ', 'cardBQ',
//  'cardBJ', 'cardBJ',
//];

//$(function(){
//matchingGame.deck.sort(shuffle);
//for (var i = 0; i < 11; i++) {
//  $('.card:first-child').clone().appendTo('#cards');
//}
//  $("#cards").children().each(function(index) {
//    $(this).css({
//      'left': ($(this).width() + 20) * (index % 4),
//      'top': ($(this).height() + 20) * Math.floor(index / 4)
//    });
//    var pattern = $('.card').pop();
//    $(this).find('.back').addClass(pattern.name);
//    $(this).attr('data-pattern', pattern.name);
//    $(this).click(selectCard);
//  });
//});
