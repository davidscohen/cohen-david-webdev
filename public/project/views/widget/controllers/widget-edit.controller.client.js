(function () {
    angular.module('projectApp')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController(widgetService,
                                  $routeParams,
                                  $location,
                                  $sce,
                                  currentUser) {
        var model = this;
        model.userId = currentUser._id;
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
        model.imgurUpload = imgurUpload;

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
            if (!widget || !widget.name || typeof widget.name === 'undefined' || widget.name === null ||widget.name ==="") {
                model.error = "Name is required";
                document.getElementById('name').style.borderColor = "red";
                model.name = "Error";

                return;
            }
            widgetService
                .updateWidget(widgetId,widget)
                .then(function () {
                    $location.url('/user/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

 function imgurUpload(imgur){
     var file = imgur.get(0).files;

     var settings = {
         async: false,
         crossDomain: true,
         processData: false,
         contentType: false,
         type: 'POST',
         url: 'https://api.imgur.com/3/image',
         headers: {
             Authorization: 'Client-ID 52cdc8fa9b3f602',
             Accept: 'application/json'
         },
         mimeType: 'multipart/form-data'
     };

     var formData = new FormData();
     formData.append("image", file[0]);
     settings.data = formData;

     $.ajax(settings).done(function(response) {
         console.log(response);
         var display = JSON.parse(response);
         var photo = display.data.link;
         document.getElementById("message").innerHTML = "<br><img src='" + display.data.link + "'</span>" +
             "<br>URL : " + display.data.link  +
             "<br>Width : " + display.data.width + " , Height : " + display.data.height +
             "<br>Type : "  + display.data.type + "</br>";
     });
 }
    }

})();
