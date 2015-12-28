/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['restApi', 'user'];
    /* @ngInject */
    function SettingsController(restApi, user) {
        var vm = this;

        vm.profile = undefined;
        vm.showLoading = false;

        vm.userData = undefined;
        vm.saveFn = saveFn;

        ///////////////

        activate();

        ///////////////

        function activate() {
            restApi.users.self.profile.get({id: user.current.id}).$promise
                .then(function(result) {
                    vm.userData = {
                        email: result.email,
                        name: result.name,
                        password: result.password
                    };
                });
        }

        function saveFn(formData) {
            restApi.users.self.profile.update(_.extend({}, formData, {id: user.current.id})).$promise
                .then(function(result) {
                    user.updateCurrentUser({
                        email: result.email,
                        name: result.name
                    });
                });
        }
    }
})();