/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'user',
                config: {
                    url: '/user/:userName',
                    templateUrl: 'app/user/user.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'user'
                }
            }
        ];
    }
})();