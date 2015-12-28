/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.admin.editAccount')
        .controller('EditAccountController', EditAccountController);

    EditAccountController.$inject = ['$stateParams', '$state', 'restApi'];
    /* @ngInject */
    function EditAccountController($stateParams, $state, restApi) {
        var userId = $stateParams.id;
        var vm = this;

        vm.userData = undefined;
        vm.saveFn = saveFn;
        vm.adminHref = $state.href('admin');

        console.log('$stateParams', $stateParams);

        ///////////////

        activate();

        ///////////////

        function activate() {
            restApi.admin.users.profile.get({id: userId}).$promise
                .then(function(result) {
                    vm.userData = result;
                });
        }

        function saveFn(formData) {
            return restApi.users.profile.update({id: userId}, formData).$promise;
        }
    }
})();