(function () {
    angular.module('projectApp')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController(widgetService,
                                  $routeParams,
                                  $location,
                                  $sce,
                                  currentUser,$scope) {
        var model = this;
        model.userRole = currentUser.role;
        model.userId = currentUser._id;
        model.userName = currentUser.username;
        model.userRole = currentUser.role;
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
                        $location.url('/user/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                    });
        }

        function updateWidget(widgetId,widget){
            widget.backUrl = "#!/user/website/" + model.websiteId + "/page/" + model.pageId + "/widget";
                if (!widget || !widget.name || typeof widget.name === 'undefined' || widget.name === null ||widget.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.backgroundColor = "#FCEDEB";
                model.name = "Error";
                return;
            }
            widgetService
                .updateWidget(widgetId,widget)
                .then(function () {
                    $location.url('/user/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
})();