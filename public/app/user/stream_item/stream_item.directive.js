/**
 * Created by ivan.makarov@mev.com on 21.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.user')
        .directive('streamItem', streamItem);

    streamItem.$inject = [];
    /* @ngInject */
    function streamItem() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: StreamItemController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'app/user/stream_item/stream_item.html',
            scope: {
                tweet: '='
            }
        };

        return directive;
    }

    StreamItemController.$inject = ['$interval', '$state', 'user'];
    /* @ngInject */
    function StreamItemController($interval, $state, user) {
        var vm = this;
        vm.isUserOwner = user.current.id === vm.tweet.userId;
        vm.remove = remove;
        vm.formattedDate = moment(vm.tweet.createdAt).fromNow();
        vm.tweetOwnerHref = $state.href('user', {userName: vm.tweet.userName});

        ///////////////

        activate();

        ///////////////

        function activate() {
            $interval(function() {
                vm.formattedDate = moment(vm.tweet.createdAt).fromNow();
            }, 15);
        }

        function remove() {
            vm.tweet.remove();
        }
    }
})();
