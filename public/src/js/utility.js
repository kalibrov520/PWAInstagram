var dbPromise = idb.open('posts-store', 1, function(db) {
    if (!db.objectStoreNames.contains('posts')) {
      db.createObjectStore('posts', { keyPath: 'id' });
    }
  });

function writeData(st, data) {
    return dbPromise
        .then(function(db) {
            var transaction = db.transaction(st, 'readwrite');
            var store = transaction.objectStore(st);
            store.put(data);
            return transaction.complete;
        });
}

function readAllData(st) {
    return dbPromise
        .then(function(db) {
            var transaction = db.transaction(st, 'readonly');
            var store = transaction.objectStore(st);
            return store.getAll();
        });
}