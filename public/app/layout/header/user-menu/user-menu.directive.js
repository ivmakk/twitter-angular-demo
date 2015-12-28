/**
 * Created by ivan.makarov@mev.com on 16.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('userMenu', userMenu);

    userMenu.$inject = [];
    /* @ngInject */
    function userMenu() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: UserMenuController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: '/app/layout/header/user-menu/user-menu.html',
            scope: true
        };

        return directive;
    }

    UserMenuController.$inject = ['$rootScope', '$state', 'user'];
    /* @ngInject */
    function UserMenuController($rootScope, $state, user) {
        var vm = this,
            links = {
                admin: $state.href('admin'),
                settings: $state.href('settings')
            };

        vm.user = user.current;
        vm.logout = logout;
        vm.isUserAuthorized = user.isAuthorized;
        vm.links = links;

        ///////////////

        activate();
        function activate() {
            $rootScope.$on('user-logged-in', function() {
                vm.user = user.current;
            });

            $rootScope.$on('user-logged-out', function() {
                vm.user = user.current;
            });
        }

        ///////////////

        function logout() {
            user.logout();
        }
    }
})();
