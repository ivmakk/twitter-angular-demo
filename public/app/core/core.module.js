(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.core.dataModels',
            'ngCookies',
            'ngResource',
            'monospaced.elastic',
            'app.layout',
            'app.user',
            'app.register',
            'app.login',
            'app.settings',
            'app.admin',
            'app.admin.editAccount',
            'app.admin.createUser',
            'blocks.router',
            'blocks.restApi',
            'blocks.user'
        ]);
})();
