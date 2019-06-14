import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyChNdM8jNP0Og72k-4NuzC92G3lZMVODSw",
    authDomain: "vue-axios-practise-2.firebaseapp.com",
    databaseURL: "https://vue-axios-practise-2.firebaseio.com",
    projectId: "vue-axios-practise-2",
    storageBucket: "vue-axios-practise-2.appspot.com",
    messagingSenderId: "861194984225",
    appId: "1:861194984225:web:0ddbb17b596f01af"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({timestampsInSnapshots:true});//it will allow to save the chat with time stamp

//const storageRef=firebase.storage().ref();
//export {storageRef, firebase as default};

export default firebaseApp.firestore();
