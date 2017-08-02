(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            document.getElementById('username').style.borderColor = "";
            document.getElementById('password').style.borderColor = "";
            model.usr = "";
            model.pwd = "";
            if ((!username || typeof username === 'undefined') && (typeof password === 'undefined' || !password)) {
                model.error = "Username and password are both required";
                model.usr = "Error";
                model.pwd = "Error";
                document.getElementById('username').style.borderColor = "red";
                document.getElementById('password').style.borderColor = "red";
                return;
            }
            if (!username || typeof username === 'undefined') {
                model.error = "Username is required";
                model.usr = "Error";
                document.getElementById('username').style.borderColor = "red";
                return;
            }
            if (!password || typeof password === 'undefined') {
                model.error = "Password is required";
                model.pwd = "Error";
                document.getElementById('password').style.borderColor = "red";
                return;
            }

            userService
               // .findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                    // $scope.message = "Welcome " + username;
                } else {
                    model.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();