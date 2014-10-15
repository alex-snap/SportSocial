'use strict';

angular.module('app').controller('RegistrationCtrl',
    ['$scope',
     '$interval',
     'registrationRqst',
     'tokenRqst',
function ($scope, $interval, registrationRqst, tokenRqst) {
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
        data = angular.extend(data, tokenRqst.obj);
        registrationRqst.requestCode(data)
            .then(function (res) {
                if (res.data.success) {
                    $scope.smsBlockShow = true;
                    $scope.timerForSms = res.data.canResendSms;
                    countdownTimer();
                } else {
                    showError(res.data.error);
                }
            }, function() {
            showError({ text: '��� �� ����� �� ���, ���������� �����' });
        }).finally(function () {
                toggleForm(false);
        });
    }

    // �������� ���� �������������, ������������� �����������
    // ---------------------
    $scope.registration = function (data) {
        toggleForm(true);
        data = angular.extend(data, tokenRqst.obj);
        data.phone = $scope.user.phone;
        registrationRqst.registration(data)
            .then(function (res) {
                if (res.data.success) {
                    $window.location.href = res.data.redirect;
                } else {
                    showError(res.data.error);
                }
            }, function () {
                showError({ text: '��� �� ����� �� ���, ��������� �����' });
            }).finally(function () {
                toggleForm(false);
        });
    }

    // ��������/������ ������, ������ ������
    // ---------------------
    function toggleForm(isSend) {
        if (isSend) {
            $scope.disabledInp = true;
            $scope.disabledCode = true;
            $scope.loader = true;
            $scope.serverError.isShow = false;
        } else {
            $scope.disabledInp = false;
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
    function showError(error) {
        $scope.serverError.isShow = true;
        $scope.serverError.message = error.text;
    }

}]);
