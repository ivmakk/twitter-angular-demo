/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'restApi', 'user'];
    /* @ngInject */
    function LoginController($scope, restApi, user) {
        var vm = this;

        vm.errorMsg = '';
        vm.login = login;
        vm.showLoading = false;

        ///////////////

        function login() {
            vm.showLoading = true;

            restApi.users.login({
                    email: vm.formData.email,
                    password: vm.formData.password
                }).$promise
                .then(function(result) {
                    user.setCurrentUser(result.email, result.name, result.id, result.subscriptions, result.followers);
                    vm.errorMsg = '';
                })
                .catch(function(err) {
                    vm.errorMsg = err.data.message;
                })
                .finally(function() {
                    vm.showLoading = false;
                })
        }
    }
})();