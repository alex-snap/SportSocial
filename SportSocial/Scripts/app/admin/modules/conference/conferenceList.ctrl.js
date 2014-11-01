'use strict';

angular.module('admin').controller('ConferenceListCtrl', ['$scope', 'utilsSrvc', 'adminRqst',
function ($scope, utilsSrvc, adminRqst) {
    // ������� �����������
    // 0 - ������� (�� ��������, �� �����������)
    // 1 - ���� (��������, �� �� �����������)
    // 2 - ����������� (����������� ���� ���������)
    // 3 - ������� (����������� ���� ������� � ������� ��� ����������)

    var confStatuses = {
        'Created': 0,
        'Process': 1,
        'Finish': 2,
        'Remove': 3
    };

    // ������
    // --------------
    $scope.model = {
        conferences:
        [
            { id: 1, title: 'OPOPOP1', status: 0, url: '#', date: '20.11.2014' },
            { id: 2, title: 'OPOPOP2', status: 1, url: '#', date: '20.11.2014' },
            { id: 3, title: 'OPOPOP3', status: 2, url: '#', date: '20.11.2014' },
            { id: 4, title: 'OPOPOP4', status: 0, url: '#', date: '20.11.2014' },
            { id: 5, title: 'OPOPOP5', status: 1, url: '#', date: '20.11.2014' }
        ]
    }

    // ������ ������ �����������
    // ---------------
    $scope.getConferences = function (filter) {
        filter = filter || {};
        $scope.isLoading = true;
        adminRqst.getConferences(utilsSrvc.token.add(filter))
            .then(function (res) {
                if (res.data.success) {
                    $scope.model.conferences.push(res.data.conferences);
                    $scope.isLoading = false;
                }
            }, function () {

            });
    }

    // ������� ������ �����������
    // ---------------
    $scope.changeConferenceStatus = function (id, statusString, el) {
        var statusNum = confStatuses[statusString];
        adminRqst.changeConferenceStatus(utilsSrvc.token.add({ id: id, status: statusNum }))
            .then(function (res) {
                if (res.data.success) {
                    el.status = statusNum;

                    // ���� ������� �����������,
                    // �� ������� � �� ������� � �� ������
                    // ----------
                    if (el.status == 3) {
                        $scope.forEach(function(v, i, ar) {
                            if (v.id === id) {
                                ar.splice(i, 1);
                                return;
                            }
                        });
                    }
                }
            });
    }
    
}]);
