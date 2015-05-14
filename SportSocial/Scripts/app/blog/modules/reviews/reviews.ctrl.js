﻿'use strict';

// Контроллер для лайков
// ---------------
angular.module('blog').controller('ReviewsCtrl',
    ['$scope',
function ($scope) {
    $scope.m = {};

    $scope.minlength = 100; // review minlength

    $scope.types = [
        { name: 'Предложить идею', id: 1 },
        { name: 'Задать вопрос', id: 2 },
        { name: 'Оставить благодарность', id: 3 }
    ];
    $scope.m.type = 1;
}]);
