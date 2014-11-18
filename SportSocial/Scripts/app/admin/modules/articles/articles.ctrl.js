'use strict';

angular.module('admin').controller('ArticlesCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ������� ������
    // 0 - �� ���������
    // 1 - ������������
    // 2 - ���������
    // 3 - ������-������ �� Fortress

    var articleStatuses = {
        'Moderate'  :   0,
        'Publish'   :   1,
        'Reject'    :   2,
        'Fortress'  :   3
    };

    // ������
    // ---------------
    $scope.er = {
        server: false   // ����������� �������
    }

    // �������
    // ---------------
    $scope.ld = {
        articles: false // loader �������� ������
    }

    // ������ 
    // ---------------
    $scope.model = {};
    
    // ������ ������ ������
    // ---------------
    $scope.getArticles = function (filter) {
        filter = filter || {};
        $scope.isLoading = true;
        adminRqst.getArticles(utilsSrvc.token.add(filter))
            .then(function (res) {
                if (res.data.length) {
                    $scope.model.articles = res.data;
                }
                $scope.er.server = false;
            }, function() {
                $scope.er.server = true;
            }).finally(function () {
                $scope.isLoading = false;
            });
    }

    // ������� ������ ������
    // ---------------
    $scope.changeArticleStatus = function (id, statusString, el) {
        var statusNum = articleStatuses[statusString];
        adminRqst.changeArticleStatus(utilsSrvc.token.add({ id: id, status: statusNum }))
            .then(function (res) {
                if (res.data.success) {
                    el.status = statusNum;
                }
            });
    }

}]);
