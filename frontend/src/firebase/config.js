import firebase from 'firebase';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDWuXQxnF0QbzjSAHAvJlBlbqJAqINvC7o",
    authDomain: "food-hub-87f2c.firebaseapp.com",
    projectId: "food-hub-87f2c",
    storageBucket: "food-hub-87f2c.appspot.com",
    messagingSenderId: "178921780596",
    appId: "1:178921780596:web:c784914128a53c21902821",
    measurementId: "G-R20VGJ2K7R"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export default storage;