(function (root) {
    var breeze = root.breeze,
        ko = root.ko,
        app = root.app = root.app || {};

    Logger.show();				// show logger initially
    log("Window is loaded.");

    // define Breeze namespace
    var entityModel = breeze.entityModel;

    // service name is route to the Web API controller
    var serviceName = 'api/BreezeDeclaration';

    // manager is the service gateway and cache holder
    var manager = new entityModel.EntityManager(serviceName);

    // define the viewmodel
    var vm = {
        declarations: ko.observableArray(),
        save: saveChanges,
        deleteDeclaration: deleteDeclaration,
        editDeclaration: editDeclaration,
        newDeclaration: ko.observable(
            {
                DeclarationName: "",
                DeclarationYear: "",
                DeclarationNote: ""
            }),
        addDeclaration: addNewDeclaration
    };

    function addNewDeclaration() {
        var item = createDeclaration({
            DeclarationName: vm.newDeclaration().DeclarationName,
            DeclarationYear: vm.newDeclaration().DeclarationYear,
            DeclarationNote: vm.newDeclaration().DeclarationNote
        });
        vm.declarations.push(item);
        vm.save();
    };

    function createDeclaration(newDeclaration) {
        return manager.createEntity('Declaration', newDeclaration);
    };
    // start fetching Declarations
    getDeclarations();

    // bind view to the viewmodel
    ko.applyBindings(vm);

    function getDeclarations() {

        log("querying Declarations");

        var query = entityModel.EntityQuery.from("GetDeclarations");

        return manager
            .executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        // clear observable array and load the results 
        function querySucceeded(data) {
            log("queried Declarations");
            vm.declarations.removeAll();
            var declarations = data.results;
            declarations.forEach(function (declaration) {
                vm.declarations.push(declaration);
            });
        }
    };

    function deleteDeclaration(declaration) {
        declaration.entityAspect.setDeleted();
        vm.declarations.remove(declaration);
        vm.save();

    }

    function editDeclaration(declaration) {
        declaration.entityAspect.setModified();
        vm.save();

    }

    $("#declarationList").delegate(".declarationDeleter", "click", function () {
        var declaration = ko.dataFor(this);
        vm.deleteDeclaration(declaration);
    });

    $("#declarationList").delegate(".editable", "dblclick", function () {
        $(".modal", this).modal();
    });

    $("#declarationList").delegate(".declarationSaver", "click", function () {
        log("sada da radimo...");
        var declaration = ko.dataFor(this);
        vm.editDeclaration(declaration);
    });

    $("#declarationList").delegate(".declarationCancel", "click", function () {
        log("cancel");
        var declaration = ko.dataFor(this);
        declaration.entityAspect.rejectChanges();
    });

    function saveChanges() {
        return manager.saveChanges()
            .then(function () { log("changes saved"); })
            .fail(saveFailed);
    }

    function queryFailed(error) {
        log("Query failed: " + error.message);
    }

    function saveFailed(error) {
        log("Save failed: " + error.message);
    }




}(window));