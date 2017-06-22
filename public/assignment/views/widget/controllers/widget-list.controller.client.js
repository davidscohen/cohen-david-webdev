
(function () {
    angular
        .module('webAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($routeParams, $sce, widgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function trust(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "https:///www.youtube.com/embed/"
            var linkUrlParts = linkUrl.split('/')
            embedUrl += linkUrlParts[linkUrlParts.length-1];
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }
})();