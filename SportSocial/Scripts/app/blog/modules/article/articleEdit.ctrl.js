'use strict';

angular.module('blog').controller('ArticleEditCtrl',
    ['$scope',
     'articleRqst',
     'utilsSrvc',
     '$timeout',
     '$window',
function ($scope, articleRqst, utilsSrvc, $timeout, $window) {

    // ��������� ����� ������� ��������/���������� ������
    // ---------------
    $scope.msg = {
        show    :   false,  // �������� ���� � �����������
        success :   false,  // ��������� �� �������� ��������
        error   :   false   // ��������� �� ������
    }

    // �������
    // ---------------
    $scope.prop = {
        btnIsDisabled: false
    }

    // �������� ������
    // ---------------
    $scope.createArticle = function (article) {
        $scope.prop.btnIsDisabled = true;
        articleRqst.createArticle(utilsSrvc.token.add(article))
            .then(function (res) {
                $scope.msg.show = true;
                if (res.data.success) {
                    $scope.msg.success = true;
                } else {
                    $scope.msg.error = true;
                }
            $timeout(function() {
                for (var v in $scope.msg) {
                    $scope.msg[v] = false;
                }
                $scope.prop.btnIsDisabled = false;
                $window.location = '/';
            }, 4000);
        });
    }

}]);
