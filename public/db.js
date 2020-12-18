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

