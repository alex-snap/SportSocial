var app = angular.module('admin', ['shared', 'ngRoute']);
  
// SPA admin
// ---------------
app.config(function ($routeProvider) {
    $routeProvider
        // ��������� ������
        // ---------------
        .when('/', {
            templateUrl: '/Scripts/templates/admin/articles.html',
            controller: 'ArticlesCtrl'
        })
        // ������ ���� �����������
        // ---------------
        .when('/conference/', {
            templateUrl: '/Scripts/templates/admin/conferenceList.html',
            controller: 'ConferenceListCtrl'
        })
        // �������� ����� �����������
        // ---------------
        .when('/conference/new', {
            templateUrl: '/Scripts/templates/admin/conferenceNew.html',
            controller: 'ConferenceNewCtrl'
        });
});


