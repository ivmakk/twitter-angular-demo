/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$stateParams', '$q', 'user', 'restApi', 'Tweets'];
    /* @ngInject */
    function UserController($stateParams, $q, user, restApi, Tweets) {
        var vm = this;

        vm.isCurrentUserOwner = $stateParams.userName ? user.current.name === $stateParams.userName : true;
        vm.isUserSubsribed = false;
        vm.followers = 0;
        vm.tweets = [];
        vm.timelineOwner = undefined;

        vm.follow = follow;
        vm.unfollow = unfollow;

        ///////////////

        activate();

        ///////////////

        function activate() {
            getTimelineOwner().then(function() {
                setUserSubscriptionStatus();
                getTweets();
                vm.followers = vm.timelineOwner.followers.length;
            });
        }

        function getTweets() {
            vm.tweets = new Tweets(vm.timelineOwner);
            vm.tweets.getRemote();
        }

        function setUserSubscriptionStatus() {
            vm.isUserSubsribed = _.indexOf(user.current.subscriptions, vm.timelineOwner.id) !== -1;
        }

        function getTimelineOwner() {
            if (!$stateParams.userName || $stateParams.userName === user.current.name) {
                return restApi.users.self.profile.get({id: user.current.id}).$promise
                    .then(function(userProfile) {
                        vm.timelineOwner = userProfile;
                    });
            } else {
                return restApi.users.profile.get({name: $stateParams.userName}).$promise
                    .then(function(userProfile) {
                        vm.timelineOwner = userProfile;
                    });
            }
        }

        function follow() {
            user.current.subscriptions.push(vm.timelineOwner.id);
            vm.followers++;
            setUserSubscriptionStatus();
            restApi.users.subscribe({id: vm.timelineOwner.id}, {subscriber_id: user.current.id})
        }

        function unfollow() {
            var i = _.indexOf(user.current.subscriptions, vm.timelineOwner.id);
            if (i !== -1) {
                user.current.subscriptions.splice(i, 1);
                setUserSubscriptionStatus();
                vm.followers--;
            }
            restApi.users.unsubscribe({id: vm.timelineOwner.id}, {subscriber_id: user.current.id});
        }
    }
})();