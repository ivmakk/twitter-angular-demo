(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('header', header);

    header.$inject = [];

    /* @ngInject */
    function header () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/header/header.html'
        };

        return directive;
    }

    TopNavController.$inject = ['$state', '$scope'];
    /* @ngInject */
    function TopNavController($state, $scope) {
        var vm = this;

        vm.homepage = $state.href('user');
        vm.navLinks = new NavLinks([
        ]);
        vm.isCurrentPage = isCurrentPage;

        ///////////////

        function isCurrentPage(name) {
            return $state.current.name === name;
        }

        /**
         * Generate navigation link list
         *
         * @param {Array} list      states name list
         * @constructor
         */
        function NavLinks (list) {
            this.list = _.map(list, function(linkName) {
                return new NavData(linkName);
            });

            function NavData (pageName, options) {
                var pageState = $state.get(pageName);

                this.url = _.string.strLeft(pageState.url);
                this.name = pageName;
                this.title = _.string.capitalize(pageState.title);
            }
        }
    }
})();
