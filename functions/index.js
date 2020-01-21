const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

var serviceAccount = require("./key/pwagram-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pwagram-8c84d.firebaseio.com/posts'
});

exports.storePostData = functions.https.onRequest((request, reponse) => {
    cors(request, response, function() {
        admin.database().ref('posts').push({
            id: request.body.id,
            title: request.body.title,
            location: request.body.location,
            image: request.body.image
        })
            .then(function() {
                response.status(201).json({ message: 'Data stored', id: request.body.id })
            })
            .catch(function(ex) {
                response.status(500).json({ error: ex }); 
            });
    });
});
