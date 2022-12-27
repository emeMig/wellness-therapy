import firebase from 'firebase/app'
import 'firebase/firestore' 
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyANRcFojlqtbbxDBtBH_JzTBBK_EwuhnlE",
    authDomain: "wellness-theraphy.firebaseapp.com",
    projectId: "wellness-theraphy",
    storageBucket: "wellness-theraphy.appspot.com",
    messagingSenderId: "781131897815",
    appId: "1:781131897815:web:0092170e19488493b9c992"
  };
  
// Initialize Firebase
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const FieldValue = firebase.firestore.FieldValue

export {
    db,
    auth,
    FieldValue
}