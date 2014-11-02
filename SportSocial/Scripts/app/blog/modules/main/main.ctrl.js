'use strict';

angular.module('blog').controller('MainBlogCtrl', ['$scope',
function ($scope) {

    // ����������
    // ---------------
    $scope.nav = {
        user: {
            isOpen: false
        }
    }

    // �������
    // ---------------
    $scope.fn = {};

    // ���� ������������ � header
    // ---------------
    $scope.fn.closeHeaderMenu = function () {
        $scope.nav.user.isOpen = false;
        $scope.$digest();
    }

}]);
