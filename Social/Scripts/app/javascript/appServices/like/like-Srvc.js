var Like;

Like = (function() {
  function Like($q, $http, $location, $rootScope, base, servicesDefault) {
    var set, url;
    url = servicesDefault.baseServiceUrl + '/like';
    set = function(data) {
      return $q(function(resolve, reject) {
        if (data && data.type && data.id && typeof data.current === 'boolean') {
          data.action = data.current ? 'dislike' : 'like';
          return $http.post(url, data).then(function(res) {
            if (res.data.success) {
              return resolve(res.data, !data.current);
            } else {
              reject(res.data);
              if (servicesDefault.noticeShow.errors) {
                return base.notice.response(res);
              }
            }
          }, function(res) {
            return reject(res);
          });
        } else {
          reject();
          if (servicesDefault.noticeShow.errors) {
            return base.notice.show({
              text: 'Like validation error',
              type: 'danger'
            });
          }
        }
      });
    };
    return {
      set: set
    };
  }

  return Like;

})();

angular.module('appSrvc').service('likeService', ['$q', '$http', '$location', '$rootScope', 'base', 'servicesDefault', Like]);
