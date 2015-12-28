/**
 * Created by ivmakk on 16.09.15.
 */
(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('loadingBlock', loadingBlock);

    loadingBlock.$inject = [];
    /* @ngInject */
    function loadingBlock() {
        var directive = {
            bindToController: true,
            controller: LoadingBlockController,
            controllerAs: 'vm',
            restrict: 'A',
            templateUrl: 'app/layout/loading_block/loading_block.html',
            scope: {
                show: '='
            }
        };

        return directive;
    }

    LoadingBlockController.$inject = [];
    /* @ngInject */
    function LoadingBlockController() {
        var vm = this;
    }
})();