/**
 * Created by ivan.makarov@mev.com on 11.11.15.
 */
(function(){
    'use strict';

    angular
        .module('blocks.user')
        .factory('user', user);

    user.$inject = ['$rootScope', '$state', '$cookies'];
    /* @ngInject */
    function user($rootScope, $state, $cookies) {
        var defaultUser = null;

        var service = {
            updateCurrentUser: updateCurrentUser,
            setCurrentUser: setCurrentUser,
            authorize: authorize,
            current: defaultUser,
            defaultState: 'login',
            isAuthorized: isAuthorized,
            login: login,
            logout: logout
        };

        return service;

        function isAuthorized() {
            return !!service.current;
        }

        function login(email, password) {
        }

        function logout() {
            resetCurrentUser();
            $state.go(service.defaultState);
        }

        function updateCurrentUser(options) {
            _.extend(service.current, options);
            console.log('updated service.current', service.current);
            $cookies.putObject('currentUser', service.current, {expires: new Date(Date.now() + 1000*60*60*24*30)});
            $rootScope.$emit('user-updated');
        }

        function setCurrentUser(email, name, id, subscriptions, followers) {
            var cookiesCurrentObj = {};

            service.current = {
                email: email,
                name: name,
                id: id,
                subscriptions: subscriptions,
                followers: followers
            };

            cookiesCurrentObj = service.current;
            $cookies.putObject('currentUser', cookiesCurrentObj, {expires: new Date(Date.now() + 1000*60*60*24*30)});
            service.defaultState = 'user';
            $rootScope.$emit('user-logged-in');
        }

        function resetCurrentUser() {
            service.current = defaultUser;
            $cookies.remove('currentUser');
            service.defaultState = 'login';
            $rootScope.$emit('user-logged-out');
        }

        function authorize() {
            var savedUser = $cookies.getObject('currentUser');

            if (savedUser) {
                setCurrentUser(savedUser.email, savedUser.name, savedUser.id, savedUser.subscriptions, savedUser.followers);
            }
        }
    }
})();