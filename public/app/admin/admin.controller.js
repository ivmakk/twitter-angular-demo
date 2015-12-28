/**
 * Created by ivan.makarov@mev.com on 22.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['restApi', '$state'];
    /* @ngInject */
    function AdminController(restApi, $state) {
        var vm = this;

        vm.users = [];
        vm.$state = $state;
        vm.createUserHref = $state.href('admin create user');

        vm.remove = remove;

        ///////////////

        activate();

        ///////////////

        function activate() {
            getUserList();
        }

        function getUserList() {
            restApi.users.list().$promise
                .then(function(results) {
                    vm.users = results;
                })
        }

        function remove(userId) {
            console.log('userId', userId);
            restApi.admin.users.remove({id: userId}, {}).$promise
                .then(function() {
                    var i = _.findIndex(vm.users, {id: userId});
                    if (i !== -1) {
                        vm.users.splice(i, 1);
                    }
                });
        }
    }
})();