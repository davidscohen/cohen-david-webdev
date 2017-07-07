(function () {
    angular.module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController(widgetService,
                                  $routeParams,
                                  $location,
                                  $sce) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.editWidgetId = $routeParams['widgetId'];

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService
                .findWidgetById(model.editWidgetId)
                .then(renderWidget);
        }

        function renderWidget(widget) {
            model.editWidget = widget;
            model.editWidgetUrl = widgetUrl(model.editWidget);
        }

        init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function widgetUrl(widget) {
            var url = 'views/widget/editors/widget-' + widget.widgetType.toLowerCase() + '-edit.view.client.html';
            return url;
        }

        function deleteWidget(widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function updateWidget(widgetId,widget){
            widgetService
                .updateWidget(widgetId,widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }


    }
})();