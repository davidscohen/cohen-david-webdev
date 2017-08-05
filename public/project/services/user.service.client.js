(function () {
    angular
        .module("projectApp")
        .factory("userService", userService);

    function userService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/project/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/project/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = "/api/project/username?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();