
(function () {
    angular
        .module("WebAppMaker")
        .controller('profileController', profileController);

    function profileController($routeParams, userService ) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.updateUser = updateUser;

        function updateUser(user) {
            userService.updateUser(userId,user)
        }

    }

})();