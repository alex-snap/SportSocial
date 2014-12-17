'use strict';

angular.module('blog').factory('articleRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (action, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Blog/' + action,
            data    :   obj
        });
    };

    // � ��������� ������, ����� ����������� ��� � ����� �����
    var getYoutubeImg = function(obj) {
        return $http({
            method: 'POST',
            url: '/File/youtubeurl',
            data: obj
        });
    }
    return {
        // �������� ������
        // --------------
        createArticle: function(obj) {
            return send('New', obj);
        },
        // �������������� ������
        // ---------------
        editArticle: function(obj) {
            return send('Edit', obj);
        },
        // �������� �����
        // ---------------
        getYoutubeImg: function (obj) {
            return getYoutubeImg(obj);
        }
    };
}]);
