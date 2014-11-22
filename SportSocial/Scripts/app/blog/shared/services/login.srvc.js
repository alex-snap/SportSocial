'use strict';

angular.module('blog').factory('loginRqst',
    ['$http',
     'serializeObj',
function ($http, serializeObj) {
     var send = function (url, obj) {
         return $http({
             method :   'POST',
             url    :   '/Login/' + url,
             data   :   serializeObj(obj),
             headers:   { 'Content-Type': 'application/x-www-form-urlencoded' }
         });
     };
     return {
         // �����������
         // --------------
         signIn: function (obj) {
             return send('SignIn', obj);
         },
         // ������ ��� ���� ������������� ��� �����������
         // --------------
         requestCode: function (obj) {
             return send('Register', obj);
         },
         // ������������� �����������
         // --------------
         registration: function (obj) {
             return send('ConfirmPhone', obj);
         },
         // ������ ���� ��� �������������� ������
         // ---------------
         requestRestoreCode: function(obj) {
             return send('RestorePassword', obj);
         },
         // �������� ������ ��� �������������� ������
         // ---------------
         restorePassword: function(obj) {
             return send('RestorePasswordConfirm', obj);
         }
     };
 }]);
