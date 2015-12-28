/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.admin.editAccount')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin edit account',
                config: {
                    url: '/admin/edit-account/:id',
                    templateUrl: 'app/admin/edit_account/edit_account.html',
                    controller: 'EditAccountController',
                    controllerAs: 'vm',
                    title: 'edit account'
                }
            }
        ];
    }
})();