(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService',FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "ab48038cd7ff7cec319a582580342754";
        var secret = "3981f28bdb9027bc";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();