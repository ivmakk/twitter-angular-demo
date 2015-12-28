/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'settings',
                config: {
                    url: '/settings',
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'vm',
                    title: 'settings',
                    params: {}
                }
            }
        ];
    }
})();