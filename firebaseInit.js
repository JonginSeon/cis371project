import firebase from "firebase";
import "firebase/database";
// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyB1PW0LRW0GaDRGsnecl4jTDg8kUqn9GzI",
   authDomain: "webapp-743e1.firebaseapp.com",
   databaseURL: "https://webapp-743e1.firebaseio.com",
   projectId: "webapp-743e1",
   storageBucket: "webapp-743e1.appspot.com",
   messagingSenderId: "606287587594",
   appId: "1:606287587594:web:1be8d4398fdb82f045f2f3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const AppDB = firebase.database();
export { AppDB }; // Make this name available to other modules

