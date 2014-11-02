'use strict';

angular.module('blog').factory('articleRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (url, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Blog/' + url,
            data    :   serializeObj(obj),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    return {
        // �������� ������
        // --------------
        createArticle: function(obj) {
            return send('New', obj);
        }
    };
}]);
