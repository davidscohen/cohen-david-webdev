(function () {
    angular
        .module('projectApp')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController(currentUser,$routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findWebsitesByUser(model.userId)
                .then(renderWebsites);

            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);

            function renderWebsites(websites) {
                model.websites = websites;
            }

            function renderWebsite(website) {
                model.website = website;
            }
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId,model.userId)
                .then(function () {
                    $location.url('/user/website');
                });
        }
        function updateWebsite(websiteId,website){
            if (!website || !website.name || typeof website.name === 'undefined' || website.name === null ||website.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.backgroundColor = "#FCEDEB";
                model.name = "Error";
                return;
            }
            websiteService
                .updateWebsite(websiteId,website,model.userId)
                .then(function () {
                    $location.url('/user/website');
                });
    }
}})();