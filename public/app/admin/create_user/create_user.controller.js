/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.admin.createUser')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state', 'restApi'];
    /* @ngInject */
    function CreateUserController($state, restApi) {
        var vm = this;

        vm.saveFn = saveFn;
        vm.adminHref = $state.href('admin');

        ///////////////

        activate();

        ///////////////

        function activate() {
        }

        function saveFn(formData) {
            return restApi.admin.users.create(formData).$promise;
        }
    }
})();