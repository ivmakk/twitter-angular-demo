/**
 * Created by ivan.makarov@mev.com on 21.12.15.
 */
(function() {
    'use strict';

    angular
        .module('app.core.dataModels')
        .factory('Tweets', tweets);

    tweets.$inject = ['restApi', 'user'];
    /* @ngInject */
    function tweets(restApi, user) {
        var TS;

        function Tweets(owner) {
            this.data = [];
            this.owner = owner || user.current;

            TS = this;
        }

        Tweets.prototype.getRemote = function() {
            var getTweetListPromise;

            if (TS.owner.id === user.current.id) {
                getTweetListPromise = restApi.tweets.list({id: TS.owner.id}).$promise;
            } else {
                getTweetListPromise = restApi.tweets.byUserId.list({id: TS.owner.id}).$promise;
            }

            return getTweetListPromise.then(function(results) {
                TS.data = _.map(results, function(tweet) {
                    return new Tweet(tweet);
                });
                return TS.data;
            });
        };

        Tweets.prototype.get = function() {
            return data;
        };

        Tweets.prototype.create = function(text) {
            return restApi.tweets.create({id: TS.owner.id, text: text}).$promise
                .then(function(result) {
                    TS.data.unshift(new Tweet(result));
                });
        };

        function getOwnerInfo(name) {
        }

        ///////////////

        function Tweet(data) {
            this.text = data.text;
            this.id = data.id;
            this.createdAt = new Date(data.created_at);
            this.userId = data.user_id;
            this.userName = data.user_name;
        }

        Tweet.prototype.update = function(text) {
            this.text = text;

            return restApi.tweets.update({
                id: this.id,
                text: text,
                user_id: this.userId
            });
        };

        Tweet.prototype.remove = function() {
            var tweet = this;

            return restApi.tweets.remove(
                    { id: this.id },
                    { user_id: this.userId }
                ).$promise
                .then(function() {
                    var i = _.findIndex(TS.data, { id: tweet.id });
                    if (i !== -1) { TS.data.splice(i, 1); }
                });
        };

        return Tweets;
    }
})();