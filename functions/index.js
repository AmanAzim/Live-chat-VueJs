const functions = require('firebase-functions');
const admin=require('firebase-admin');

admin.initializeApp();//make the database access possible

//https://firebase.google.com/docs/functions/firestore-events#wildcards-parameters
exports.controlChatLimit=functions.firestore.document('messages/{userId}').onCreate((snapshot, context)=>{
    let ref=admin.firestore().collection('messages').orderBy('timestamp');
    //snapshot contains the last state of the database always. every update every start state.
    //console.log('snapShot',snapshot.data())
    ref.onSnapshot(snapshot=>{
        let i=0;
        let size=snapshot.size;
        let sizeToDelete=size-10;
        console.log('Messages count: ',size);
        snapshot.forEach(doc=>{
            if(i<sizeToDelete){
                doc.ref.delete().then(()=>{
                    console.log('Document deleted successfully')
                }).catch(err=>console.log('Error removing document',err));
            }
            i++;
        })
    })
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*   */
