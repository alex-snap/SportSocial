'use strict';

// ���������� ����������� ������������
// ---------------
angular.module('blog').controller('AuthorizationCtrl',
    ['$scope',
     '$interval',
     '$window',
     'loginRqst',
     'utilsSrvc',
function ($scope, $interval, $window, authorizationRqst, utilsSrvc) {
    $scope.loading      =   false;  // ��������/������ ������
    $scope.er = {                   // ������
        s404    :   false,          // ������ �� ��������
        server  :   ''              // ������ � ������� � ����������
    }

    // �������� ������, ������ ���� �������������
    // ---------------------
    $scope.signIn = function (data) {
        $scope.er.server = '';
        $scope.er.s404 = false;
        $scope.loading = true;
        $scope.formDisabled = true;
        authorizationRqst.signIn(utilsSrvc.token.add(data))
            .then(function (res) {
                if (res.data.success) {
                    $window.location.href = res.data.redirect;
                } else {
                    $scope.er.server = res.data.error;
                }
                $scope.loading = true;
                $scope.formDisabled = true;
            }, function () {
                $scope.er.s404 = true;
                $scope.loading = true;
                $scope.formDisabled = true;
            });
    }

}]);
