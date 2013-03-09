(function (root) {
    var app = root.app;

    log("Breeze Devices is booting");

    ko.applyBindings(app.peopleViewModel);

}(window));