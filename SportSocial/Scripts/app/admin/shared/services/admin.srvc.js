'use strict';

angular.module('admin').factory('adminRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (url, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Admin/' + url,
            data    :   serializeObj(obj),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    return {
        // �������� ������ ������
        // --------------
        getArticles: function(obj) {
            return send('GetArticles', obj);
        },
        // ������������ ������
        // ---------------
        publishArticle: function(obj) {
            return send('PublishArticle', obj);
        },
        // ��������� ������
        // ---------------
        rejectArticle: function(obj) {
            return send('RejectArticle', obj);
        },
        // �������� ������ �����������
        // --------------
        getConferences: function(obj) {
            return send('getConferences', obj);
        },
        // ������� �����������
        // ---------------
        createConference: function(obj) {
            return send('CreateConference', obj);
        }
    };
}]);
