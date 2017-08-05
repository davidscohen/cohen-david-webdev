(function () {
    angular
        .module('projectApp')
        .factory('pageService', pageService);

    function pageService($http) {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        return {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            var url = '/api/project/website/'+ websiteId + '/page';
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageByWebsiteId(websiteId) {
            var url = '/api/project/website/'+websiteId+'/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pageId) {
            var url = '/api/project/page/'+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, page) {
            var url = '/api/project/page/'+pageId;
            return $http.put(url,page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            var url = '/api/project/page/'+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();