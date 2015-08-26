(function(){
var restorePassword;

restorePassword = (function() {
  function restorePassword($state, $location, $q, $rootScope, $http, base, mixpanel, servicesDefault) {
    var isNewPassSending, isPhoneSending, sendNewPassword, sendPhone, urlOne, urlTwo;
    urlOne = servicesDefault.baseServiceUrl + '/restore_password_one';
    urlTwo = servicesDefault.baseServiceUrl + '/restore_password_two';
    isPhoneSending = false;
    isNewPassSending = false;
    sendPhone = function(data, prop) {
      var evTrackProp, opts;
      opts = angular.extend(servicesDefault, prop);
      evTrackProp = {
        url: $location.path(),
        title: $rootScope.title
      };
      return $q(function(resolve, reject) {
        if (data && data.phone && !isPhoneSending) {
          isPhoneSending = true;
          mixpanel.api('track', 'RestorePassword__phone-send', evTrackProp);
          return $http(urlOne, data).then(function(res) {
            if (res.success) {
              resolve(res);
            } else {
              reject(res);
            }
            if (opts.showNotice) {
              return base.notice.response(res);
            }
          }, function(res) {
            reject(res);
            if (opts.showNotice) {
              return base.notice.show({
                text: 'Restore phone server error',
                type: 'danger'
              });
            }
          })["finally"](function() {
            return isPhoneSending = false;
          });
        } else {
          reject();
          if (opts.showNotice) {
            return base.notice.show({
              text: 'Restore phone validation error',
              type: 'danger'
            });
          }
        }
      });
    };
    sendNewPassword = function(data, prop) {
      var evTrackProp, opts;
      opts = angular.extend(servicesDefault, prop);
      evTrackProp = {
        url: $location.path(),
        title: $rootScope.title
      };
      return $q(function(resolve, reject) {
        if (data && data.phone && data.password && !isNewPassSending) {
          isNewPassSending = true;
          mixpanel.api('track', 'RestorePassword__new-password-send', evTrackProp);
          return $http(urlTwo, data).then(function(res) {
            if (res.success) {
              resolve(res);
            } else {
              reject(res);
            }
            if (opts.showNotice) {
              return base.notice.response(res);
            }
          }, function(res) {
            reject(res);
            if (opts.showNotice) {
              return base.notice.show({
                text: 'Restore new password server error',
                type: 'danger'
              });
            }
          })["finally"](function() {
            return isNewPassSending = false;
          });
        } else {
          reject();
          if (opts.showNotice) {
            return base.notice.show({
              text: 'Restore new password validation error',
              type: 'danger'
            });
          }
        }
      });
    };
    return {
      sendPhone: sendPhone,
      sendNewPassword: sendNewPassword
    };
  }

  return restorePassword;

})();

angular.module('appSrvc').service('restorePasswordService', ['$state', '$location', '$q', '$rootScope', '$http', 'base', 'mixpanel', 'servicesDefault', restorePassword]);

})();