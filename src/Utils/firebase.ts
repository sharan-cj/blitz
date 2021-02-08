import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDAaNQtY-lnqpNiDTqdXUkfgGVsLd6K3dc",
    authDomain: "blitzmessenger-88369.firebaseapp.com",
    projectId: "blitzmessenger-88369",
    storageBucket: "blitzmessenger-88369.appspot.com",
    messagingSenderId: "709403196718",
    appId: "1:709403196718:web:820bd4c4adc8183aab4ebf",
    measurementId: "G-7SL5LB5QSC"
  };
 
  
export const Firebase =  firebase.initializeApp(firebaseConfig);
export const firebaseAnalytics = firebase.analytics();