/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyDFcBEHHQPo3FMwKmvVEgxOBM3T6M8Oc4s",
    authDomain: "hotdog-e27b2.firebaseapp.com",
    databaseURL: "https://hotdog-e27b2.firebaseio.com",
    projectId: "hotdog-e27b2",
    storageBucket: "hotdog-e27b2.appspot.com",
    messagingSenderId: "898970679003"
});

AppRegistry.registerComponent(appName, () => App);
