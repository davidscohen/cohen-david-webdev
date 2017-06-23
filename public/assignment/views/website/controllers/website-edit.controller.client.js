(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = websiteService.findWebsiteByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(model.websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite(website){
            websiteService.updateWebsite(website);
            $location.url('/user/'+model.userId+'/website');
        }
    }
})();