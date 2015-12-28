/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: '',
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    console.log('state', state);
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function init() {
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }
})();
