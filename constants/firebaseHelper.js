/**
 * @providesModule firebaseHelper
 */

import ReactNative from "react-native";
import * as firebase from 'firebase';

class Firebase{
    static init(){
        //Initialize Firebase
      firebase.initializeApp({
        apiKey: "AIzaSyDNOYRFLGbhSNi5JMVZEPRoUvkDLok2lUg",
        authDomain: "examen2-b7139.firebaseapp.com",
        databaseURL: "https://examen2-b7139.firebaseio.com",
        projectId: "examen2-b7139",
        storageBucket: "examen2-b7139.appspot.com",
        messagingSenderId: "903701432960"
      })
    }
  }
  module.exports  = Firebase



  