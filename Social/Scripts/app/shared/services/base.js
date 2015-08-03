﻿'use strict';

// todo: полезные модули. если будет больше 5 штук - разделить

angular.module('shared')
    .factory('base', [
        '$timeout',
        '$window',
        function ($timeout, $window) {
            
            // Token module
            // ---------------
            var tokenCtrl = (function() {
                var tokenName = 'csrfmiddlewaretoken',
                    tokenEl = angular.element('input[type="hidden"][name=' + tokenName + ']'),
                    tokenVal = tokenEl.length ? tokenEl.val() : null,
                    tokenObj = {};
                tokenObj[tokenName] = tokenVal;

                // Получить antiforgery token
                // ---------------
                function getToken() {
                    return {
                        obj: tokenObj,
                        val: tokenVal
                    }
                }

                // Добавить antiforgery token
                // ---------------
                function addToken(obj) {
                    return angular.extend(obj, tokenObj);
                }

                return {
                    getToken: getToken,
                    addToken: addToken
                }
            })();

            // Format module TODO: переделать, не работает для количества от 10 до 20
            // ---------------
            var formatCtrl = (function() {
                // Склонение слов
                // ---------------
                function formatWord(count, words) {
                    var cnt = count.toString().substring(count.toString().length - 1, count.toString().length);
                    if (cnt == 1) {
                        return words[0];
                    } else if (cnt > 1 && cnt < 5) {
                        return words[1];
                    } else return words[2];
                }

                return {
                    formatWord: formatWord
                }
            })();

            // Errors module
            // ---------------
            var errorCtrl = (function() {
                var $template = $('<div>', { 'class': 'form--error' });

                // array = [ { field: 'domain', message: 'Сайт уже существует' } ]
                function showErrors(array) {
                    if (isArray(array)) {
                        for (var i = 0; i <= array.length; i++) {
                            var _this = array[i],
                                $fields = $('[name="' + _this.field + '"]').length ? $('[name="' + _this.field + '"]') : false;
                            if ($fields !== false && !$fields.siblings('form--error').length) {
                                var $error = $template.clone().text(_this.error).insertAfter($fields.eq(0));
                                window.setTimeout(function() {
                                    $error.fadeOut('slow', function() {
                                        $error.remove();
                                    });
                                }, 5000);
                            } else {
                                console.log('error module: field isn\'t found');
                            }
                        }    
                    }
                }

                return {
                    showErrors: showErrors
                }
            })();

            // Notices module
            // ---------------
            var noticesCtrl = (function() {

                var $body = angular.element('body'),
                    defaults = {
                        type: 'info',
                        delay: 6000,
                        autohide: true
                    },
                    boxClass = 'float-notice alert alert-',
                    bottomOffset = 20,
                    margin = 10,
                    notices = [];

                // todo: по возможности переделать в что то вроде emit, broadcast
                // с целью отвязаться от события если уведомлений в массиве нет
                angular.element(window).on('resize', function () {
                    if (notices.length) {
                        for (var i = 0; i < notices.length; i++) {
                            setBottomOffset(i);
                        }
                        checkColumnHeight();
                    }
                });

                // ----------
                function show(opts) {
                    var options = mergeOpts(opts),
                        $tmpl = angular.element('<div>', { class: boxClass + options.type }).html(options.text);
                    $tmpl.id = new Date().getTime();
                    $body.append($tmpl);
                    notices.push($tmpl);
                    setBottomOffset(notices.length - 1);

                    checkColumnHeight();

                    if (options.autohide) {
                        $timeout(function () {
                            hide($tmpl.id);
                        }, options.delay);
                    }
                        
                    return {
                        $el: $tmpl,
                        id: $tmpl.id
                    }
                }

                // ----------
                function hide(it) {
                    var id;
                    if (it !== null && it !== undefined) {
                        if (typeof it === 'object' && it.id !== undefined) {
                            id = it.id;
                        } else if (typeof it === 'number') {
                            id = it;
                        }
                        for (var i = 0; i <= notices.length; i++) {
                            if (notices[i] != undefined && notices[i].id === id) {
                                notices[i].remove();
                                notices.splice(i, 1);
                                for (var j = i; j <= notices.length; j++) {
                                    setBottomOffset(j);
                                }
                                break;
                            }
                        }
                    }
                }

                // ----------
                function hideAll() {
                    for (var i = 0; i < notices.length; i++) {
                        notices[i].remove();
                    }
                    notices = [];
                }

                // ----------
                function setBottomOffset(i) {
                    var offset = bottomOffset;
                    if (notices[i] != undefined) {
                        if (notices[i - 1] != undefined) {
                            for (var j = 0; j <= notices.indexOf(notices[i - 1]); j++) {
                                offset += notices[j].outerHeight() + margin;
                            }
                        }
                        notices[i].css('bottom', offset);
                    }
                }

                // ----------
                function checkColumnHeight() {
                    var $lastEl = notices[notices.length - 1],
                        wH = $window.innerHeight,
                        bottom = parseInt($lastEl[0].style.bottom);
                    if (wH < $lastEl.outerHeight() + bottom) {
                        hide(notices[0]);
                        if (wH < $lastEl.outerHeight() + bottom)
                            checkColumnHeight();
                    }
                }

                // ----------
                function mergeOpts(opts) {
                    return angular.extend({}, defaults, opts);
                }

                // ----------
                return {
                    show: show,
                    hide: hide,
                    hideAll: hideAll
                }

            })();

            // Delay module
            // ---------------
            var delayCtrl = (function () {
                var timer = 0;
                return function (callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            // check is Array
            // ---------------
            function isArray(array) {
                if( Object.prototype.toString.call(array) === '[object Array]' ) {
                    return true;
                }
                return false;
            }

            // ---------------
            return {
                token: {
                    get: tokenCtrl.getToken,
                    add: tokenCtrl.addToken
                },
                format: {
                    word: formatCtrl.formatWord
                },
                errors: {
                    show: errorCtrl.showErrors
                },
                notice: {
                    show: noticesCtrl.show,
                    hide: noticesCtrl.hide,
                    hideAll: noticesCtrl.hideAll
                },
                isArray: isArray,
                delay: delayCtrl
            }
        }
    ]);
