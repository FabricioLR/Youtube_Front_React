import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDd5EXof3T7uhxoB-F29sGAb-0gjtnQ0gw",
    authDomain: "teste-javascript-2062a.firebaseapp.com",
    databaseURL: "https://teste-javascript-2062a-default-rtdb.firebaseio.com",
    projectId: "teste-javascript-2062a",
    storageBucket: "teste-javascript-2062a.appspot.com",
    messagingSenderId: "202396574471",
    appId: "1:202396574471:web:47a918861e8f7facf41ba2",
    measurementId: "G-G53L5CCC96"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export default storage