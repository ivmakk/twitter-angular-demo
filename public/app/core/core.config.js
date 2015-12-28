(function () {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfigure);

    coreConfigure.$inject = ['routerHelperProvider'];

    function coreConfigure(routerHelperProvider) {
        routerHelperProvider.configure({});
    }
})();
