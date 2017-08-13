(function () {
    angular
        .module('projectApp')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        model.register = register;
        document.getElementById("role").selectedIndex = "1";
        function register(username, password, passwordVerify, role) {
            document.getElementById('username').style.backgroundColor = "";
            document.getElementById('password').style.backgroundColor = "";
            document.getElementById('passwordVerify').style.backgroundColor = "";
            model.usr = "";
            model.pwd = "";
            model.pwdv = "";

            if((username === null || username === '' || typeof username === 'undefined') &&
                (!password || password !== passwordVerify || password === null || typeof password === 'undefined')) {
                model.error = "Username and matching passwords required";
                document.getElementById('username').style.backgroundColor = "#FCEDEB";
                document.getElementById('password').style.backgroundColor = "#FCEDEB";
                document.getElementById('passwordVerify').style.backgroundColor = "#FCEDEB";
                model.usr = "Error";
                model.pwd = "Error";
                model.pwdv = "Error";
                return;
            }

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                document.getElementById('username').style.backgroundColor = "#FCEDEB";
                model.usr = "Error";
                return;
            }

            if(!password || password !== passwordVerify || password === null || typeof password === 'undefined') {
                model.error = "Passwords are required and must match";
                document.getElementById('password').style.backgroundColor = "#FCEDEB";
                document.getElementById('passwordVerify').style.backgroundColor = "#FCEDEB";
                model.pwd = "Error";
                model.pwdv = "Error";
                return;
            }

            if(!role || role === null || typeof role === 'undefined') {
                model.error = "Role is required";
                document.getElementById('role').style.backgroundColor = "#FCEDEB";
                model.role = "Error";
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
                            password: password,
                            role: role
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