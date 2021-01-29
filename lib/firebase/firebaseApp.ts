import firebase from "firebase";

export default !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: "np-hard-dbcf5.firebaseapp.com",
      projectId: "np-hard-dbcf5",
      storageBucket: "np-hard-dbcf5.appspot.com",
      appId: "1:313327476691:web:b99c982fa180bbbbd89926",
      measurementId: "G-YBT8S31D4Z",
    })
  : firebase.app();
