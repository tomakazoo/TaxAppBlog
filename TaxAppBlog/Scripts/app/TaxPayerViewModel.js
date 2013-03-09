(function (root) {
    var app = root.app;
    var dataservice = app.dataservice;

    var vm = {
        people: ko.observableArray([]),
        hide: ko.observable(true)
    };

    getAllPersons()
        // reveal view when query succeeds
        .then(function () { vm.hide(false); });

    app.peopleViewModel = vm;

    function getAllPersons() {
        return dataservice.getAllPersons(vm.people);
    }

}(window));