'use strict';

angular.module('app').controller('ArticleCreateCtrl',
    ['$scope',
     'articleRqst',
     'tokenRqst',
function ($scope, articleRqst, tokenRqst) {

    // ����� �� ������� �� �������� �����������
    // ---------------
    $scope.test = function(res) {
        debugger;
    }

    //$scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
    //    debugger;
    //});

    $scope.createArticle = function() {
        
    }

}]);
