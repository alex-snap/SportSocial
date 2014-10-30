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
        // �������� ������ ������
        // ---------------
        changeArticleStatus: function (obj) {
            return send('ChangeArticleStatus', obj);
        },
        // �������� ������ �����������
        // --------------
        getConferences: function (obj) {
            return send('GetConferences', obj);
        },
        // ������� �����������
        // ---------------
        createConference: function(obj) {
            return send('CreateConference', obj);
        },
        // �������� ������ �����������
        // ---------------
        changeConferenceStatus: function(obj) {
            return send('ChangeConferenceStatus', obj);
        }
    };
}]);
