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
