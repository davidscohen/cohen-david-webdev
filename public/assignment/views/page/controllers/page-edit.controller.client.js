(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController(currentUser,$routeParams,$location,
                                pageService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            pageService.findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPages(pages) {
            model.pages = pages;
        }
        function renderPage(page) {
            model.page = page;
        }

        function deletePage(pageId) {

            pageService.deletePage(pageId)
                .then(function () {
                    $location.url('/user/website/' + model.websiteId + '/page');
                });
        }
        function updatePage(pageId,page){
            if (!page || !page.name || typeof page.name === 'undefined' || page.name === null ||page.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.borderColor = "red";
                model.name = "Error";
                return;
            }
            pageService.updatePage(pageId,page)
                .then(function () {
                    $location.url('/user/website/' + model.websiteId + '/page');
                });
        }

    }
})();