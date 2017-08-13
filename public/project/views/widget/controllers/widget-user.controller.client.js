(function () {
    angular.module('projectApp')
        .controller('widgetUserController',widgetUserController);

    function widgetUserController(currentUser,widgetService,
                                  $routeParams,
                                  $sce) {
        var model = this;
        model.userId = currentUser._id;
        model.userName = currentUser.username;
        model.userRole = currentUser.role;
        model.websiteId = $routeParams['websiteId'];
        model.user = $routeParams['usr'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService
                .findAllWidgetsForUser(model.user)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {

            model.widgets = widgets;
        }

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
            var d = new Date(widget.dateCreated);
            model.widgetDate = d.toString();
            model.usr = widget.usr;
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

    }

})();