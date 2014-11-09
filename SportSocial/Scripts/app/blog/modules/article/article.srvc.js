'use strict';

angular.module('blog').factory('articleRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (action, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Blog/' + action,
            data    :   obj
        });
    };
    var get = function(action, obj) {
        return $http({
            method  :   'GET',
            url     :   '/Blog/' + action,
            params  :   obj
        });
    }
    return {
        // �������� ������
        // --------------
        createArticle: function(obj) {
            return send('New', obj);
        }
    };
}]);
