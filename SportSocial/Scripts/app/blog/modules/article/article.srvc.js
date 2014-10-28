'use strict';

angular.module('app').factory('articleRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (url, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Article/' + url,
            data    :   serializeObj(obj),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    return {
        // �������� ������
        // --------------
        createArticle: function(obj) {
            return send('Create', obj);
        }
    };
}]);