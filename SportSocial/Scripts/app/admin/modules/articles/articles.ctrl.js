'use strict';

angular.module('admin').controller('ArticlesCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ������� ������
    // 0 - �� ���������
    // 1 - ������������
    // 2 - ���������
    
    var articleStatuses = {
        'Moderate'  :   0,
        'Publish'   :   1,
        'Reject'    :   2
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

    // �������� ������
    // --------------
    //$scope.model = {
    //    articles: 
    //    [
    //        { id: 1, title: 'OPOPOP1', status: 0, url: '#', date: '20.11.2014' },
    //        { id: 2, title: 'OPOPOP2', status: 1, url: '#', date: '20.11.2014' },
    //        { id: 3, title: 'OPOPOP3', status: 2, url: '#', date: '20.11.2014' },
    //        { id: 4, title: 'OPOPOP4', status: 0, url: '#', date: '20.11.2014' },
    //        { id: 5, title: 'OPOPOP5', status: 1, url: '#', date: '20.11.2014' }
    //    ]
    //}
    
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
