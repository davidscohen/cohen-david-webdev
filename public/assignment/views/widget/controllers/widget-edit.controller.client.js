(function () {
    angular
        .module('webAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.WidgetId = $routeParams['widgetId'];
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.editWidget = widgetService.findWidgetById(model.WidgetId);
            model.editWidgetUrl = widgetUrl(model.editWidget);

        }
        init();





        function widgetUrl(widget) {
            var url = 'views/widget/editors/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }


        function updateWidget(widgetId,widget){
            widgetService.updateWidget(widgetId,widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId + '/page/' + model.pageId + '/widget');

        }
    }

})()