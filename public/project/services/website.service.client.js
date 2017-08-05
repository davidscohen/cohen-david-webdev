(function () {
    angular
        .module('projectApp')
        .service('websiteService', websiteService);

    function websiteService($http) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findWebsitesByUser: findWebsitesByUser

        };

        return api;

        function findWebsiteById(websiteId) {
            var url = '/api/project/website/' + websiteId;
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function createWebsite(website, userId) {
            var url = '/api/project/user/' + userId + '/website';
            return $http.post(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function updateWebsite(websiteId, website, userId) {
            var url = '/api/project/user/' + userId + '/website/' + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function deleteWebsite(websiteId, userId) {
            var url = '/api/project/user/' + userId + '/website/' + websiteId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        function findWebsitesByUser(userId) {
            var url = '/api/project/user/' + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }
    }
})();

