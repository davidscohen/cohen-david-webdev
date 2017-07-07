(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);


    function pageNewController($routeParams,
                               $location,
                               pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createPage = createPage;

        function init() {
            model.pages = pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            function renderPages(pages) {
                model.pages = pages;
            }
        }
        init();

        function createPage(name, title) {
            var page = {
                name: name,
                description: title
            };
            pageService
                .createPage(model.websiteId, page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });

        }


    }
})();