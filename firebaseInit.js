import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
  authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
  databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
  projectId: 'vuejs-firebase-01-55b96',
  storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
  messagingSenderId: '687212823219'
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
