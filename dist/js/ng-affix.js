(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ngAffix.config', [])
    .value('ngAffix.config', {
      debug: true
    });

  // Modules
  angular.module('ngAffix.directives', []);
  angular.module('ngAffix',
    [
      'ngAffix.config',
      'ngAffix.directives'
    ]);

})(angular);

(function (angular) {
  angular
    .module('ngAffix.directives')
    .directive('affix', function ($window, $document, $timeout) {
      function getInformation(element) {
        return {
          offsetHeight: element.prop('offsetHeight'),
          top: element.offset().top,
          left: element.offset().left
        };
      }

      function bind(startInformation, offset, stopInformation, callbackStart, callbackStop, callbackReset) {
        var positionStart = startInformation.top - offset;
        var positionStop = stopInformation.top - startInformation.offsetHeight - offset;

        if ($window.pageYOffset >= positionStop) return callbackStop();
        if ($window.pageYOffset >= positionStart) return callbackStart();
        callbackReset();
      }

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var startInformation, stopInformation;
          var startClass = attrs.startClass || 'affix-start';
          var offset = parseInt(attrs.offset) || 0;
          var stopClass = attrs.stopClass || 'affix-stop';
          var stopElement = attrs.stopElement;

          function init() {
            $timeout(function () {
              startInformation = getInformation(element);

              if ($document[0].getElementById(stopElement)) {
                stopInformation = getInformation(angular.element($document[0].getElementById(stopElement)));
              } else {
                stopInformation = element[0].offsetParent;
                if (stopInformation) stopInformation = getInformation(angular.element(stopInformation));
              }

              bind(startInformation, offset, stopInformation, callbackStart, callbackStop, callbackReset);

              var reposition = function () {
                bind(startInformation, offset, stopInformation, callbackStart, callbackStop, callbackReset);
              };

              scope.$watch(function () {
                return element.prop('offsetHeight');
              }, function () {
                startInformation.offsetHeight = element.prop('offsetHeight');
              });

              angular.element($window).bind('resize scroll', reposition);

              element.on('$destroy', function() {
                angular.element($window).unbind();
              });
            }, 0);
          }

          init();

          var callbackStart = function () {
            element.addClass(startClass);
            element.removeClass(stopClass);
          };

          var callbackStop = function () {
            element.addClass(stopClass);
            element.removeClass(startClass);
          };

          var callbackReset = function () {
            element.removeClass(startClass);
            element.removeClass(stopClass);
          };
        }
      };
    });
})(angular);
