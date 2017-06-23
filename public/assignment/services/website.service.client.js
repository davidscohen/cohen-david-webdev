(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService() {

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
            findWebsiteByUser: findWebsiteByUser

        };

        return api;

        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
        }

        function deleteWebsite(websiteId) {
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }

        function findWebsiteById(websiteId) {
            for(var v in websites) {
                if (websites[v]._id === websiteId) {
                    return websites[v];
                }
            }
        }

        function findWebsiteByUser(userId) {
            var result = [];
            for (var v in websites) {
                if (websites[v].developerId === userId) {
                    result.push(websites[v]);
                }
            }
            return result;
        }

        function updateWebsite(websiteId, website) {
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    websites[w] = website;
                }
            }
        }
    }
})();