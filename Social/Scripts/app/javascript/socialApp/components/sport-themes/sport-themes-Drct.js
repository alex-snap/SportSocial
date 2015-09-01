var ThemesAutocomplete;

ThemesAutocomplete = (function() {
  function ThemesAutocomplete(journalSubmitService) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      replace: true,
      scope: {
        themes: '=ngModel'
      },
      controller: 'themesAutocompleteController',
      templateUrl: '/template/components/sport-themesTpl',
      link: function(scope, element, attrs, ngModel) {}
    };
  }

  return ThemesAutocomplete;

})();

angular.module('socialApp.directives').directive('themesAutocomplete', ['journalSubmitService', ThemesAutocomplete]);
