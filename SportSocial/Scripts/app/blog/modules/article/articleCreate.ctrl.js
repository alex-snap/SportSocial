'use strict';

angular.module('blog').controller('ArticleCreateCtrl',
    ['$scope',
     'articleRqst',
     'utilsSrvc',
function ($scope, articleRqst, utilsSrvc) {
    $scope.er = {
        create: {
            show: false,
            msg: ''
        }
    }

    // �������� ������
    // ---------------
    $scope.createArticle = function (article) {
        debugger;
        articleRqst.createArticle(utilsSrvc.token.add(article))
            .then(function(res) {
                if (!res.data.success) {
                    $scope.er.create.show = true;
                    $scope.er.create.msg = res.data.error;
                }
            });
    }

}]);
