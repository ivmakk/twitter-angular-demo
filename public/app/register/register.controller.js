/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['restApi', 'user'];
    /* @ngInject */
    function RegisterController(restApi, user) {
        var vm = this;

        vm.errorMsg = '';
        vm.register = register;
        vm.validPassword = validPassword ;
        vm.showLoading = false;

        ///////////////

        function register() {
            vm.showLoading = true;

            restApi.users.register({
                    name: vm.formData.name,
                    email: vm.formData.email,
                    password: vm.formData.password
                }).$promise
                .then(function(result) {
                    user.setCurrentUser(result.email, result.name, result.id, [], []);
                    vm.errorMsg = '';
                })
                .catch(function(err) {
                    vm.errorMsg = err.data.message;
                })
                .finally(function() {
                    vm.showLoading = false;
                })
        }

        function validPassword() {
            if (vm.formData.password !== vm.formData.confirmPassword) {
                vm.registerForm['confirm-password'].$setValidity('password-equal', false);
            } else {
                vm.registerForm['confirm-password'].$setValidity('password-equal', true);
            }
        }
    }
})();