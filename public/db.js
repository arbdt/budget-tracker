let db; // to store DB reference

// create/connect to IndexedDB version of Budget database
const request = indexedDB.open("budget", 1);

// generically handle errors
request.onerror = function(event) {
    console.log("Error! " + event.target.errorCode);
};

// connect success
request.onsuccess = function(event) {
    db = event.target.result; // set reference to IndexedDB instance
  
    // check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

// set up database
request.onupgradeneeded = function(event){
    let db = event.target.result;
    // create "pending" object store with auto-generated auto-incrementing key
    db.createObjectStore("pending", {autoIncrement: true});
};

// add entries to indexedDB
function addToOfflineDB(recordToAdd) {
    //connect to indexed DB instance
    let dbtransaction = db.transaction("pending", "readwrite");
    let dbstore = dbtransaction.objectStore("pending");
    // add to indexed DB
    dbstore.add(recordToAdd);
}

// read from indexedDB
function getFromOfflineDB(){
    // connect to indexed db
    let dbtransaction = db.transaction("pending", "readwrite");
    let dbstore = dbtransaction.objectStore("pending");
    // get all from indexed db
    dbstore.getAll();
}

// check online / offline status
window.addEventListener('online', function(e) { console.log('online'); });