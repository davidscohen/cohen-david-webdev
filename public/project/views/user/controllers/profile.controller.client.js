
(function () {
    angular
        .module("projectApp")
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {

        var model = this;
        //var userId = currentUser.id;//$routeParams['userId'];
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        // userService
        //     .findUserById(userId)
        //     .then(renderUser);

        function init() {
            renderUser(currentUser);
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }


        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

    }
})();