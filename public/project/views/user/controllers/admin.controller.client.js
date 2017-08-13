(function () {
    angular
        .module("projectApp")
        .controller("adminController", adminController);

    function adminController(userService) {

        var model = this;

        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        model.deleteUser = deleteUser;

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        model.createUser = createUser;
        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        model.selectUser = selectUser;

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        model.updateUser = updateUser;
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

    }
})();