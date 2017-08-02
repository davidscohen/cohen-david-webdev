(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(currentUser,$routeParams,
                                  $location,
                                  websiteService) {
        var model = this;

        model.userId = currentUser._id;
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
            if (!website || !website.name || typeof website.name === 'undefined') {
                model.error = "Name is required";
                document.getElementById('name').style.borderColor = "red";
                model.name = "Error";
                return;
            }
            websiteService
                .createWebsite(website,model.userId)
                .then(function () {
                    $location.url('/user/website');
                });
        }
    }
})();