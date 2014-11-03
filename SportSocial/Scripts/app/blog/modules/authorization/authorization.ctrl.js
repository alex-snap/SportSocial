'use strict';

angular.module('blog').controller('AuthorizationCtrl',
    ['$scope',
     '$interval',
     'authorizationRqst',
     'utilsSrvc',
function ($scope, $interval, authorizationRqst, utilsSrvc) {
    $scope.loading      =   false;  // ��������/������ ������
    $scope.er = {                   // ������
        server: false,              // ������ �� ��������
        custom: {                   // ������ � ������� � ����������
            show: false,
            msg: ''
        }
    }

    // �������� ������, ������ ���� �������������
    // ---------------------
    $scope.authorization = function (data) {
        $scope.er.custom.show = false;
        $scope.er.server = false;
        $scope.loading = true;
        $scope.formDisabled = true;
        data = angular.extend(data, utilsSrvc.token.get().obj);
        authorizationRqst.signIn(data)
            .then(function (res) {
                if (res.data.success) {
                    $window.location.href = res.data.redirect;
                } else {
                    $scope.er.custom.show = true;
                    $scope.er.custom.msg = res.data.error;
                }
                $scope.loading = true;
                $scope.formDisabled = true;
            }, function () {
                $scope.er.server = true;
                $scope.loading = true;
                $scope.formDisabled = true;
            });
    }

}]);
