'use strict';

angular.module('app').controller('AuthorizationCtrl',
    ['$scope',
     '$interval',
     'authorizationRqst',
     'utilsSrvc',
function ($scope, $interval, authorizationRqst, utilsSrvc) {
    $scope.loading      =   false;  // ��������/������ ������
    $scope.serverError = {          // ������ � �������
        isShow  :   false,
        message :   ''
    }

    // �������� ������, ������ ���� �������������
    // ---------------------
    $scope.authorization = function (data) {
        $scope.serverError.isShow = false;
        $scope.loading = true;
        $scope.formDisabled = true;
        data = angular.extend(data, utilsSrvc.token.get().obj);
        authorizationRqst.signIn(data)
            .then(function (res) {
                if (res.data.success) {
                    $window.location.href = res.data.redirect;
                } else {
                    showError(res.data.error);
                }
                $scope.loading = true;
                $scope.formDisabled = true;
            }, function () {
                showError({ text: '��� �� ����� �� ���, ��������� �����' });
                $scope.loading = true;
                $scope.formDisabled = true;
            });
    }

    // ��������� � �������
    // ---------------------
    function showError(error) {
        $scope.serverError.isShow = true;
        $scope.serverError.message = error.text;
    }

}]);
