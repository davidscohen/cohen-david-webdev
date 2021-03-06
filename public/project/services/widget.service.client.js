(function () {
    angular
        .module('projectApp')
        .service('widgetService', widgetService);

    function widgetService($http) {
        this.createWidget = createWidget;
        this.deleteWidget = deleteWidget;
        this.orderWidgets = orderWidgets;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.updateFlickr = updateFlickr;
        this.findAllWidgetsForUser = findAllWidgetsForUser;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/tnBQmEqBCY0" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(pageId,widget) {
            var url = '/api/project/page/' + pageId + '/widget';
            return $http.post(url,widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(widgetId) {
            var url = '/api/project/widget/' + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            var url = '/api/project/widget/' + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId,widget) {
            var url = '/api/project/widget/' + widgetId;
            return $http.put(url,widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllWidgetsForPage(pageId) {
            var url = '/api/project/page/' + pageId + '/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function orderWidgets(pageId,index1,index2) {
            var url = '/api/project/page/' + pageId + '/widget?initial=' + index1 + '&final=' + index2;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateFlickr(pageId,widgetId,urlObject) {
            var url = '/api/project/flickr/' + pageId + '/' +widgetId;
            return $http.put(url,urlObject)
                .then(function (response) {
                    return response.data;
                })
        }

    function findAllWidgetsForUser(user) {
        var url = '/api/project/userpage/' + user;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            })
    }
    }
})();

