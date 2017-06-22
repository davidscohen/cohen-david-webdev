(function () {
    angular
        .module("webAppMaker")
        .config(widgetConfiguration);
    function widgetConfiguration($routeProvider) {
        $routeProvider
            .when("/user/:userId/website/:websiteId/page/:pageId/widget",{
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new",{
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId",{
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
    }
})();