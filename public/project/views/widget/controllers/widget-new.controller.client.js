(function () {
    angular.module('projectApp')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController(currentUser,widgetService,
                                 $routeParams,
                                 $location) {
        var model = this;
        model.userRole = currentUser.role;
        model.userId = currentUser._id;
        model.userName = currentUser.username;
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
                usr: model.userName,
                widgetType:widgetType,
                name:name
            };
            if (!widget || !widget.name || typeof widget.name === 'undefined' || widget.name === null ||widget.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.backgroundColor = "#FCEDEB";
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
