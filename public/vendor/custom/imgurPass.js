function hello(string){
    var name=string;
    var field = document.getElementById("url");
    var element = angular.element(field);
    element.val(name);
    element.triggerHandler('input');

}