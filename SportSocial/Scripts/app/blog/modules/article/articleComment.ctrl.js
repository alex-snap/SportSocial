'use strict';

angular.module('blog').controller('ArticleCommentCtrl',
    ['$scope',
     'articleRqst',
     'utilsSrvc',
function ($scope, articleRqst, utilsSrvc) {

    // ������
    // ---------------
    $scope.er = {
        server: false,
        create: false
    }

    // �������
    // ---------------
    $scope.ld = {
        creating: false
    }

    // �������� �����������
    // ---------------
    $scope.createComment = function (text) {
        articleRqst.createArticle(utilsSrvc.token.add(data))
            .then(function(res) {
                if (res.data.success) {
                    $scope.er.create.show = true;
                    $scope.er.create.msg = res.data.error;
                } else {
                    $scope.er.create = true;
                }
            }, function() {
                $scope.er.server = true;
            }).finally(function () {
                $scope.ld.creating = false;
            });
    }

}]);
