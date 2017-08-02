(function () {
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, passwordVerify) {
            document.getElementById('username').style.borderColor = "";
            document.getElementById('password').style.borderColor = "";
            document.getElementById('passwordVerify').style.borderColor = "";
            model.usr = "";
            model.pwd = "";
            model.pwdv = "";

            if((username === null || username === '' || typeof username === 'undefined') &&
                (!password || password !== passwordVerify || password === null || typeof password === 'undefined')) {
                model.error = "Username and matching passwords required";
                document.getElementById('username').style.borderColor = "red";
                document.getElementById('password').style.borderColor = "red";
                document.getElementById('passwordVerify').style.borderColor = "red";
                model.usr = "Error";
                model.pwd = "Error";
                model.pwdv = "Error";
                return;
            }

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                document.getElementById('username').style.borderColor = "red";
                model.usr = "Error";
                return;
            }

            if(!password || password !== passwordVerify || password === null || typeof password === 'undefined') {
                model.error = "Passwords are required and must match";
                document.getElementById('password').style.borderColor = "red";
                document.getElementById('passwordVerify').style.borderColor = "red";
                model.pwd = "Error";
                model.pwdv = "Error";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .register(newUser)
                            .then(function (user) {
                                $location.url('/profile');
                            });
                    }
                );
        }
    }
})();