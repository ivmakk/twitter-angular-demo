/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.admin.createUser')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin create user',
                config: {
                    url: '/admin/create-user',
                    templateUrl: 'app/admin/create_user/create_user.html',
                    controller: 'CreateUserController',
                    controllerAs: 'vm',
                    title: 'edit account'
                }
            }
        ];
    }
})();