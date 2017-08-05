(function () {
    angular.module('projectApp')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController(currentUser,widgetService,
                                 $routeParams,
                                 $location) {
        var model = this;
        model.userId = currentUser._id;
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

        function createWidget(widgetType,name) {
            var widget = {
                widgetType:widgetType,
                name:name
            };
            if (!widget || !widget.name || typeof widget.name === 'undefined' || widget.name === null ||widget.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.borderColor = "red";
                model.name = "Error";
                return;
            }
            widgetService
                .createWidget(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/user/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();
