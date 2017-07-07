(function () {
    angular.module('WebAppMaker')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController(widgetService,
                                 $routeParams,
                                 $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        model.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = {
                widgetType:widgetType
            };
            widgetService
                .createWidget(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();
