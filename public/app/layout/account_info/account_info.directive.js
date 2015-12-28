/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('accountInfo', accountInfo);

    accountInfo.$inject = [];
    /* @ngInject */
    function accountInfo() {
        var directive = {
            bindToController: true,
            controller: AccountInfoController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'app/layout/account_info/account_info.html',
            scope: {
                userData: '=',
                saveFn: '='
            }
        };

        return directive;
    }

    AccountInfoController.$inject = [];
    /* @ngInject */
    function AccountInfoController() {
        var vm = this;

        vm.showLoading = false;

        vm.save = save;

        ///////////////

        activate();

        ///////////////

        function activate() {
        }

        function save() {
            vm.saveFn(vm.userData);
        }
    }
})();
