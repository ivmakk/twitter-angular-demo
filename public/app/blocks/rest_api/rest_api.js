/**
 * Created by ivan.makarov@mev.com on 20.12.15.
 */
(function(){
    'use strict';

    angular
        .module('blocks.restApi')
        .factory('restApi', restApi);

    restApi.$inject = ['$resource'];

    /* @ngInject */
    function restApi($resource) {
        var apiUrl = 'http://127.0.0.1:8888/api',
            //apiUrl = 'http://dev02.m3v.us:8889/api',
            resource = $resource('', {}, {
                register: { method: 'POST', url: apiUrl + '/register', isArray: false },
                login: { method: 'POST', url: apiUrl + '/login', isArray: false },
                logout: { method: 'POST', url: apiUrl + '/logout', isArray: false },
                getSelfProfile: { method: 'GET', url: apiUrl + '/users/self/profile', isArray: false },
                updateSelfProfile: { method: 'POST', url: apiUrl + '/users/self/profile/update', isArray: false },
                getSelfTweets: { method: 'GET', url: apiUrl + '/users/self/tweets/list', isArray: true },
                createTweet: { method: 'POST', url: apiUrl + '/users/self/tweets/:id/create', isArray: false },
                removeTweet: { method: 'POST', url: apiUrl + '/users/self/tweets/:id/delete', isArray: false},
                getUserProfile: { method: 'GET', url: apiUrl + '/users/:name/profile', isArray: false },
                getUserTweets: { method: 'GET', url: apiUrl + '/users/:id/tweets/list', isArray: true },
                subscribe: { method: 'POST', url: apiUrl + '/users/:id/subscribe', isArray: false },
                unsubscribe: { method: 'POST', url: apiUrl + '/users/:id/unsubscribe', isArray: false },
                getUserList: { method: 'GET', url: apiUrl + '/users/list', isArray: true },
                updateUserProfile: { method: 'POST', url: apiUrl + '/users/:id/update', isArray: false },
                getUserProfileByAdmin: { method: 'GET', url: apiUrl + '/users/:id', isArray: false },
                removeUser: { method: 'POST', url: apiUrl + '/users/:id/delete', isArray: false },
                adminCreateUser: { method: 'POST', url: apiUrl + '/users/create', isArray: false }
            }),
            service = {
                users: {
                    register: resource.register,
                    login: resource.login,
                    logout: resource.logout,
                    self: {
                        profile: {
                            get: resource.getSelfProfile,
                            update: resource.updateSelfProfile
                        }
                    },
                    profile: {
                        get: resource.getUserProfile,
                        update: resource.updateUserProfile
                    },
                    subscribe: resource.subscribe,
                    unsubscribe: resource.unsubscribe,
                    list: resource.getUserList
                },
                tweets: {
                    list: resource.getSelfTweets,
                    create: resource.createTweet,
                    remove: resource.removeTweet,
                    byUserId: {
                        list: resource.getUserTweets
                    }
                },
                admin: {
                    users: {
                        create: resource.adminCreateUser,
                        profile: {
                            get: resource.getUserProfileByAdmin
                        },
                        remove: resource.removeUser
                    }
                }
            };

        return service;
    }
})();