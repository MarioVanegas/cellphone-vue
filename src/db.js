// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAAM18skyPuM2FJ97b8Mx-XgSxs2aXC29M",
    authDomain: "vue-cellphone-vc17018.firebaseapp.com",
    projectId: "vue-cellphone-vc17018",
    storageBucket: "vue-cellphone-vc17018.appspot.com",
    messagingSenderId: "672929746932",
    appId: "1:672929746932:web:9ab0964df01df7822c33a1"
};
var app = firebase
    .initializeApp(firebaseConfig)

export const db = app.firestore()

export const st = app.storage()

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }