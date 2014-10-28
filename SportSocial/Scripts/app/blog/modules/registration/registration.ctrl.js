'use strict';

angular.module('app').controller('RegistrationCtrl',
    ['$scope',
     '$interval',
     'registrationRqst',
     'utilsSrvc',
function ($scope, $interval, registrationRqst, utilsSrvc) {
    $scope.smsBlockShow =   false;  // ��������/������ ��� ����
    $scope.loading      =   false;  // ��������/������ ������
    $scope.disableInp   =   false;  // ��������� ���� �����
    $scope.disabledCode =   false;  // ��������� ���� ����� ���
    $scope.timerForSms  =   0;      // ������ ��� ���
    $scope.serverError = {          // ������ � �������
        isShow  :   false,
        message :   ''
    }


    // �������� ������, ������ ���� �������������
    // ---------------------
    $scope.requestCode = function (data) {
        toggleForm(true);
        data = angular.extend(data, utilsSrvc.token.get().obj);
        registrationRqst.requestCode(data)
            .then(function (res) {
                if (res.data.success) {
                    $scope.smsBlockShow = true;
                    $scope.timerForSms = res.data.canResendSms;
                    countdownTimer();
                } else {
                    showError(res.data.errorMessage);
                }
                toggleForm(false);
            }, function() {
                showError({ text: '��� �� ����� �� ���, ���������� �����' });
                toggleForm(false);
            });
    }

    // �������� ���� �������������, ������������� �����������
    // ---------------------
    $scope.registration = function (data) {
        toggleForm(true);
        data = angular.extend(data, utilsSrvc.token.get().obj);
        data.phone = $scope.user.phone;
        registrationRqst.registration(data)
            .then(function (res) {
                if (res.data.success) {
                    $window.location.href = res.data.redirect;
                } else {
                    showError(res.data.errorMessage);
                }
                toggleForm(false);
            }, function () {
                showError({ text: '��� �� ����� �� ���, ��������� �����' });
                toggleForm(false);
            });
    }

    // ��������/������ ������, ������ ������
    // ---------------------
    function toggleForm(isSend) {
        if (isSend) {
            $scope.disableInp = true;
            $scope.disabledCode = true;
            $scope.loader = true;
            $scope.serverError.isShow = false;
        } else {
            $scope.disableInp = false;
            $scope.disabledCode = false;
            $scope.loader = false;
        }
    }

    // ������ ��������� �������� ���
    // ---------------------
    function countdownTimer() {
        var smsTime = $interval(function () {
            if ($scope.timerForSms == 0) {
                $interval.cancel(smsTime);
            } else {
                $scope.timerForSms = $scope.timerForSms - 1;
            }
        }, 1000);
    }

    // ��������� � �������
    // ---------------------
    function showError(message) {
        $scope.serverError.isShow = true;
        $scope.serverError.message = message;
    }

}]);
