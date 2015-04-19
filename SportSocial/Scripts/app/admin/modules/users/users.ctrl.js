'use strict';

angular.module('admin').controller('UsersCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ������� ������������
    // 0 - ������������
    // 1 - ������
    // 2 - ���������� ������������
    // 3 - ������� ������������

    var usersStatuses = {
        'Block': 0,
        'Remove': 1,
        'Trust': 2,
        'Simple': 3
    };

    // ������
    // ---------------
    $scope.er = {
        server: false   // ����������� �������
    }

    // �������
    // ---------------
    $scope.ld = {
        users: false, // loader �������� �������������
        statistic: true // loader �������� ����������
    }

    // ������ 
    // ---------------
    $scope.model = {};

    getUsers();
    getStatistic();

    // ������� ��� �������� �������������
    // ---------------
    function getUsers(filter) {
        filter = filter || {};
        $scope.isLoading = true;
        adminRqst.getUsers(utilsSrvc.token.add(filter))
            .then(function (res) {
                if (res.data.length) {
                    $scope.model.users = res.data;
                }
                $scope.er.server = false;
            }, function () {
                $scope.er.server = true;
            }).finally(function () {
                $scope.isLoading = false;
            });
    }

    // �������� ����� ���������� �������������
    // ---------------
    function getStatistic() {
        adminRqst.getUsersStatistic(utilsSrvc.token.add({}))
            .then(function(res) {
                if (res.data.length) {
                    $scope.model.statistic = res.data;
                    $scope.statisticIsLoaded = true;
                }
            }).finally(function() {
            $scope.ld.statistic = false;
        });
    }

    $scope.getUsersStatistic = function(){
        getStatistic();
    }

    // ������ ������ �������������
    // ---------------
    $scope.getUsers = function (filter) {
        getUsers(filter);
    }

    // ������� ������ ������������
    // ---------------
    $scope.changeUserStatus = function (id, statusString, el) {
        var statusNum = usersStatuses[statusString];
        adminRqst.changeUserStatus(utilsSrvc.token.add({ id: id, status: statusNum }))
            .then(function (res) {
                if (res.data.success) {
                    el.status = statusNum;
                }
            });
    }

}]);
