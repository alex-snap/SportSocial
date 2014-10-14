'use strict';

angular.module('app').controller('RegistrationCtrl',
    ['$scope',
     '$interval',
     'registrationRqst',
     'tokenRqst',
function ($scope, $interval, registrationRqst, tokenRqst) {
    $scope.smsBlockShow =   false;  // ��������/������ ��� ����
    $scope.loading      =   false;  // ��������/������ ������
    $scope.serverError  =   false;  // ������ � �������
    $scope.disableInp   =   false;  // ��������� ���� �����
    $scope.disabledCode =   false;  // ��������� ���� ����� ���
    $scope.timerForSms  =   0;      // ������ ��� ���


    // �������� ������, ������ ���� �������������
    // ---------------------
    $scope.requestCode = function (data) {
        toggleForm();
        $scope.disableInp = true;
        data = angular.extend(data, tokenRqst.obj);
        registrationRqst.requestCode(data)
            .then(function(res) {
                if (res.success) {
                    $scope.smsBlockShow = true;
                    $scope.timerForSms = res.canResendSms;
                    countdownTimer();
                    toggleForm(false);
                } else {
                    $scope.disableInp = false;
                    handleError(res.error);
                    toggleForm(false);
                }
            }, function() {
                $scope.serverError = true;
                $scope.disableInp = false;
        });
    }

    // �������� ���� �������������, ������������� �����������
    // ---------------------
    $scope.registration = function (data) {
        $scope.disabledCode = true;
        toggleForm(true);
        data = angular.extend(data, tokenRqst.obj);
        registrationRqst.registration(data)
            .then(function (res) {
                if (res.success) {
                    $window.location.href = res.redirect;
                } else {
                    handleError(res.error);
                }
                $scope.disabledCode = false;
                toggleForm(false);
            }, function () {
                $scope.serverError = true;
                $scope.disabledCode = false;
                toggleForm(false);
            });
    }

    // ��������/������ ������, ������ ������
    // ---------------------
    function toggleForm(isSend) {
        if (isSend) {
            $scope.loader = true;
            $scope.serverError = false;
        } else {
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
    function handleError(error) {
        
    }

}]);
