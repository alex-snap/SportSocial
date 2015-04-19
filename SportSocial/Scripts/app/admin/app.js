var app = angular.module('admin', ['shared', 'ngRoute']);

// SPA admin
// ---------------
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // ��������� ������
        // ---------------
        .when('/', {
            templateUrl: '/Scripts/templates/admin/articles/articles.html',
            controller: 'ArticlesCtrl'
        })
        // ������ ���� �����������
        // ---------------
        .when('/conference/list', {
            templateUrl: '/Scripts/templates/admin/conference/conferenceList.html',
            controller: 'ConferenceListCtrl'
        })
        // �������� ����� �����������
        // ---------------
        .when('/conference/new', {
            templateUrl: '/Scripts/templates/admin/conference/conferenceNew.html',
            controller: 'ConferenceNewCtrl'
        })
        // ������ ���� �������������
        // ---------------
        .when('/users', {
            templateUrl: '/Scripts/templates/admin/users/users-list.html',
            controller: 'UsersCtrl'
        })
        // �������������� �����������
        // ---------------
        .when('/conference/item/:id', {
            templateUrl: '/Scripts/templates/admin/conference/conferenceEdit.html',
            controller: 'ConferenceEditCtrl'
        });
}]);


