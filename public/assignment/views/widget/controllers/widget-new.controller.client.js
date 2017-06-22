(function () {
    angular
        .module('webAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                 $location,
                                 widgetService) {
        var model = this;
        model.userId = $routeParams["userId"];
        model.websiteId = $routeParams["websiteId"];
        model.pageId = $routeParams["pageId"];
        model.createWidget = createWidget;

        init();

        function init() {
            model.widget = {
                widgetType: $routeParams["wgtType"].toUpperCase()
            }
        }

        function createWidget(pageId, widget) {
            widgetService.createWidget(pageId, widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/');
        }
    }
})();