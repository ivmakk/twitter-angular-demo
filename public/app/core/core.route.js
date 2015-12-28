(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', 'user'];
    /* @ngInject */
    function appRun($rootScope, $state, user) {
        user.authorize();

        if ($state.current.url === '^') {
            $state.go(user.defaultState);
        }

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            //if (!user.isStateAvailable(toState.name)) {
            //    event.preventDefault();
            //
            //    if (user.isStateAvailable(user.defaultState)) {
            //        $state.go(user.defaultState);
            //    } else {
            //        throw new Error('Default state is not available for user!');
            //    }
            //}
        });

        $rootScope.$on('$stateChangeError', function(event, toState) {
            //if (toState.name !== user.defaultState) { // prevent loop
            //    $state.go(user.defaultState);
            //}
        });

        $rootScope.$on('user-logged-in', function() {
            $state.go(user.defaultState);
        });

        $rootScope.$on('user-logged-out', function() {
            $state.go(user.defaultState);
        });
    }
})();
