(function () {
    angular
        .module('wbdvDirectives',['ngRoute'])
        .directive('wbdvSortable',wbdvSortable);

    function wbdvSortable() {

        function linkFunction(element,
                              directiveController,
                              scope,
                              attributes) {
            element.sortable({
                start: function (event,ui) {
                    ui.item.startPosition = ui.item.index();
                },
                update: function (event,ui) {
                    var index1 = ui.item.startPosition;
                    var index2 = ui.item.index();
                    directiveController.orderWidgets(index1,index2);
                },
                axis:'y'
            });
        }
        return {
            link: linkFunction,
            controller:directiveController
        }
    }

    function directiveController(widgetService,
                                 $routeParams,
                                 $http) {
        var model = this;
        model.orderWidgets = orderWidgets;
        function orderWidgets(index1,index2) {
            var pageId = $routeParams['pageId'];
            widgetService
                .orderWidgets(pageId,index1,index2)
                .then(function () {
                    console.log("Success");
                })
        }
    }
})();