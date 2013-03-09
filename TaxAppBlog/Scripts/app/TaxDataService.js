(function (root) {
    var breeze = root.breeze;
    var app = root.app = root.app || {};

    Logger.show();				// show logger initially
    log("Window is loaded.");

    var serviceName = 'api/BreezePeople';

    var manager = new breeze.EntityManager(serviceName);

    // add members to the dataservice
    var dataservice = {
        getAllPersons: getAllPersons
    };

    // extend the app with this dataservice
    app.dataservice = dataservice;

    // gets all Persons asynchronously
    // returning a promise you can wait for     
    function getAllPersons(peopleArray) {
        log("querying for all persons")
        var query = new breeze.EntityQuery()
                .from("GetPeople");

        return manager
           .executeQuery(query)
           .then(function (data) {
               processResults(data, peopleArray);
           })
           .fail(queryFailed);
    }

    // clears observable array and loads the person results 
    function processResults(data, peopleArray) {
        log("Clears observable array and loads the person results.");
        peopleArray.removeAll();
        var persons = data.results;
        persons.forEach(function (person) {
            log("adding " + person.FirstName._latestValue + " " + person.FamilyName._latestValue);
            peopleArray.push(person);
        });
    }

    function queryFailed(error) {
        log("Query failed: " + error.message);
    }

}(window));
