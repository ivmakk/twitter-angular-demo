/**
 * Created by ivan.makarov@mev.com on 21.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.user')
        .directive('tweetBox', tweetBox);

    tweetBox.$inject = [];
    /* @ngInject */
    function tweetBox() {
        var directive = {
            replace: true,
            bindToController: true,
            controller: TweetBoxController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'app/user/tweet_box/tweet_box.html',
            scope: {
                createTweet: '='
            }
        };

        return directive;
    }

    TweetBoxController.$inject = [];
    /* @ngInject */
    function TweetBoxController() {
        var vm = this;

        vm.tweetText = '';
        vm.isFocused = false;

        vm.tweet = tweet;
        vm.onFocus = onFocus;
        vm.onBlur = onBlur;

        ///////////////

        function tweet() {
            vm.createTweet(vm.tweetText).then(function() {
                vm.tweetText = '';
            })
        }

        function onFocus() {
            vm.isFocused = true;
        }

        function onBlur() {
            vm.isFocused = false;
        }
    }
})();
