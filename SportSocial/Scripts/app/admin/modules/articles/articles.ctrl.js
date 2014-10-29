'use strict';

angular.module('admin').controller('ArticlesCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ������� ������
    // 0 - �� ���������
    // 1 - ������������
    // 2 - ���������
    
    // ������
    // --------------
    $scope.model = {
        articles: [
            { id: 1, title: 'OPOPOP1', status: 0, url: '#', date: '20.11.2014' },
            { id: 2, title: 'OPOPOP2', status: 1, url: '#', date: '20.11.2014' },
            { id: 3, title: 'OPOPOP3', status: 2, url: '#', date: '20.11.2014' },
            { id: 4, title: 'OPOPOP4', status: 0, url: '#', date: '20.11.2014' },
            { id: 5, title: 'OPOPOP5', status: 1, url: '#', date: '20.11.2014' }
        ]
    }
    
    // ������ ������ ������
    // ---------------
    $scope.getArticles = function (filter) {
        $scope.isLoading = true;
        adminRqst.getArticles(utilsSrvc.token.add(filter))
            .then(function (res) {
                if (res.data.success) {
                    $scope.model.articles.push(res.data.articles);
                    $scope.isLoading = false;
                }
            }, function () {

            });
    }

    // ���������� ������
    // ---------------
    $scope.publish = function (id, article) {
        adminRqst.publishArticle(utilsSrvc.token.add({ id: id }))
            .then(function (res) {
                if (res.data.success) {
                    article.status = 1;
                }
            });
    };

    // ���������� ������
    // ---------------
    $scope.reject = function (id, article) {
        adminRqst.rejectArticle(utilsSrvc.token.add({ id: id }))
            .then(function (res) {
                if (res.data.success) {
                    article.status = 2;
                }
            });
    }
}]);
