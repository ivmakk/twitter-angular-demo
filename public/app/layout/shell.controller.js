(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', 'user'];
    /* @ngInject */
    function ShellController($rootScope, user) {
        var vm = this;

        vm.isUserLogged = user.isAuthorized();

        ///////////////

        activate();

        ///////////////

        function activate() {
            $rootScope.$on('user-logged-in', function() {
                vm.isUserLogged = true;
            });

            $rootScope.$on('user-logged-out', function() {
                vm.isUserLogged = false;
            });
        }
    }
})();