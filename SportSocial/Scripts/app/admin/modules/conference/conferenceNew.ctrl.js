'use strict';

angular.module('admin').controller('ConferenceNewCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ���������
    // ---------------
    $scope.msg = {
        created: false
    };

    // ������
    // ---------------
    $scope.er = {
        server: false,  // ������ ����������
        create: false   // ������ ��� ��������
    }
    
    // ������� �����������
    // ---------------
    $scope.createConference = function (data, isInvalid) {
        if (isInvalid) {
            $scope.er.create = true;
            return;
        }
        $scope.er.server = false;
        $scope.er.create = true;
        adminRqst.createConference(utilsSrvc.token.add(data))
            .then(function(res) {
                if (res.data.success) {
                    $scope.msg.created = true;
                    $scope.model.title = '';
                    $scope.model.description = '';
                    $scope.model.link = '';
                    $scope.model.date = '';
                } else {
                    $scope.er.create = true;
                }
            }, function() {
            $scope.er.server = true;
        });
    }

}]);
