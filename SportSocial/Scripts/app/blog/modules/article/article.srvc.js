'use strict';

angular.module('blog').factory('articleRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (url, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Blog/' + url,
            data    :   obj
        });
    };
    return {
        // �������� ������
        // --------------
        createArticle: function(obj) {
            return send('New', obj);
        },
        // �������� �����������
        // ---------------
        createComment: function(obj) {
            return send('Comment', obj);
        },
        // �������� ������������
        // ---------------
        loadComments: function(obj) {
            return send('LoadComments', obj);
        }
    };
}]);
