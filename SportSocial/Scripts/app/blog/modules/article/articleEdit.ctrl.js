'use strict';

angular.module('blog').controller('ArticleEditCtrl',
    ['$scope',
     'articleRqst',
     'utilsSrvc',
     '$timeout',
     '$window',
function ($scope, articleRqst, utilsSrvc, $timeout, $window) {

    // service helper
    // ---------------
    var p = {
            'edit': 'editArticle',
            'new': 'createArticle'
        },
        getVideoImgTimer = null;

    $scope.ar = {};

    // ��������� ����� ������� ��������/���������� ������
    // ---------------
    $scope.msg = {
        show    :   false,  // �������� ���� � �����������
        success :   false,  // ��������� �� �������� ��������
        error   :   false   // ��������� �� ������
    }

    // ���������� ��� ����� ��������
    // ---------------
    $scope.media = {
        photo: {
            show: false   // � �������� �������� ������� ��������
        },
        video: {
            show    :   false,  // � �������� �������� ������� �����
            valid   :   false,  // ������ �� ����� ����������
            loaded  :   false,  // ������ �� ����� ��� �����������
            loading :   false,  // ���� ��������
        },
        cancel: function (type) {
            for (var pr in $scope.media[type]) {
                $scope.media[type][pr] = false;
            }
            $scope.ar.images = [];
            $scope.ar.videourl = '';
        }
    }

    // �������
    // ---------------
    $scope.prop = {
        btnIsDisabled: false
    }

    // ������ � �����
    // ---------------
    $scope.$watch('ar.videourl', function (val, oldVal) {
        if (val != undefined && val.length && val != oldVal) {
            if (getVideoImgTimer) $timeout.cancel(getVideoImgTimer);
            getVideoImgTimer = $timeout(function () {
                $scope.media.video.loading = true;
                articleRqst.getYoutubeImg(utilsSrvc.token.add({ youtubeurl: val }))
                    .then(function (res) {
                        if (res.data.success) {
                            $scope.ar.images.push(res.data);
                            $scope.media.video.valid = true;
                        } else {
                            $scope.media.video.valid = false;
                        }
                        $scope.media.video.loaded = true;
                        $scope.media.video.loading = false;
                    });
            }, 350);
        }
    });

    // ��������������/�������� ������
    // ---------------
    $scope.sendArticleData = function (article) {
        $scope.prop.btnIsDisabled = true;
        articleRqst[p[$scope.type]](utilsSrvc.token.add(article))
            .then(function (res) {
                $scope.msg.show = true;
                if (res.data.success) {
                    $scope.msg.success = true;
                } else {
                    $scope.msg.error = true;
                }
                $timeout(function () {
                    for (var v in $scope.msg) {
                        $scope.msg[v] = false;
                    }
                    $scope.prop.btnIsDisabled = false;
                    $window.location = '/';
                }, 4000);
            });
    }

}]);
