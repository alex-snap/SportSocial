'use strict';

angular.module('blog').factory('registrationRqst', ['$http', 'serializeObj', function ($http, serializeObj) {
    var send = function (url, obj) {
        return $http({
            method  :   'POST',
            url     :   '/Login/' + url,
            data    :   serializeObj(obj),
            headers :   { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };
    return {
        // ������ ��� ���� �������������
        // --------------
        requestCode: function(obj) {
            return send('Register', obj);
        },
        // ������������� �����������
        // --------------
        registration: function(obj) {
            return send('ConfirmPhone', obj);
        }
    };
}]);
