(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController(currentUser,$routeParams,
                                pageService) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams["websiteId"];

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();