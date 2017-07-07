(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            websiteService
                .createWebsite(website,model.userId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();