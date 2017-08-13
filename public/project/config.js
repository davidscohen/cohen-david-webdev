(function() {
    angular
        .module("projectApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider

            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })

            .when("/", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })

            .when("default", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedInProfileGuest
                }
            })

            .when("/user/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "websiteListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/website/new", {
                templateUrl: "views/website/templates/website-new.view.client.html",
                controller: "websiteNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/website/:websiteId", {
                templateUrl: "views/website/templates/website-edit.view.client.html",
                controller: "websiteEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when("/user/website/:websiteId/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/website/:websiteId/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkVisualArtist
                }
            })

            .when("/user/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when("/user/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/:usr",{
                templateUrl: "views/widget/templates/widget-user.view.client.html",
                controller: "widgetUserController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/website/:websiteId/page/:pageId/widget/new",{
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkVisualArtist
                }
            })

            .when("/user/website/:websiteId/page/:pageId/widget/response",{
                templateUrl: "views/widget/templates/widget-chooser-response.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkWriter
                }
            })

            .when("/user/website/:websiteId/page/:pageId/widget/:widgetId",{
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/user/website/:websiteId/page/:pageId/widget/:widgetId/search",{
                templateUrl:"views/widget/templates/widget-flickr-search.view.client.html",
                controller:"flickrController",
                controllerAs:"model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/admin/', {
                templateUrl : "views/user/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkAdmin
                }
            })

    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkLoggedInProfileGuest(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                    var index = user.role.indexOf('Guest');
                    if (index > -1){
                        $location.url('/user/website');
                    }
                }
            });

        return deferred.promise;
    }



    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                    $location.url('/login');
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    if(typeof user.role ==='undefined' || user.role === null || user.role.length ===0){
                        deferred.reject();
                        $location.url('/login');
                    }
                    else{
                        var index = user.role.indexOf('Admin');
                        if (index > -1){
                            deferred.resolve(user);
                        }
                        else{
                            deferred.reject();
                            $location.url('/login');
                        }
                    }

                }
            });

        return deferred.promise;
    }

    function checkVisualArtist(userService, $q, $location,$routeParams) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    if(typeof user.role ==='undefined' || user.role === null || user.role.length ===0){
                        deferred.reject();
                        $location.url('/login');
                    }
                    else{
                        var index = user.role.indexOf('Visual Artist');
                        if (index > -1){
                            deferred.resolve(user);
                        }
                        else{
                            deferred.reject();
                            $location.url('/login');
                        }
                    }

                }
            });

        return deferred.promise;
    }

    function checkWriter(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    if(typeof user.role ==='undefined' || user.role === null || user.role.length ===0){
                        deferred.reject();
                        $location.url('/login');
                    }
                    else{
                        var index = user.role.indexOf('Writer');
                        if (index > -1){
                            deferred.resolve(user);
                        }
                        else{
                            deferred.reject();
                            $location.url('/login');
                        }
                    }

                }
            });

        return deferred.promise;
    }

})();

