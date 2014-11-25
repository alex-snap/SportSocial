'use strict';

angular.module('blog').controller('FeedbackCtrl',
    ['$scope',
     'feedbackRqst',
     'utilsSrvc',
function ($scope, feedbackRqst, utilsSrvc) {

    // ��������� ����� ������� ��������/���������� ������
    // ---------------
    $scope.msg = {
        show    :   false,  // �������� ���� � �����������
        success :   false,  // ��������� �� �������� ��������
        server  :   '',     // ��������� �� ������
        s404    :   false   // ������ ����������
    }

    // �������� ������
    // ---------------
    $scope.sendFeedback = function (data) {
        for (var v in $scope.msg) {
            $scope.msg[v] = false;
        }
        feedbackRqst.sendFeedback(utilsSrvc.token.add(data))
            .then(function(res) {
                if (res.data.success) {
                    $scope.msg.success = true;
                } else {
                    $scope.msg.server = res.data.errorMessage;
                }
            }, function() {
                $scope.msg.s404 = true;
            }).finally(function() {
                $scope.msg.show = true;
            });
    }

}]);
