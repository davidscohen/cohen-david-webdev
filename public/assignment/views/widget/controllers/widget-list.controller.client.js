(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);

        }

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();