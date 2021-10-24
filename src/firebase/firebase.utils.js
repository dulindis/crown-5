import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBOdEooC69FJ2URJgLBlAC6G_9T2fLSqnw",
    authDomain: "crwn-5.firebaseapp.com",
    projectId: "crwn-5",
    storageBucket: "crwn-5.appspot.com",
    messagingSenderId: "841384345182",
    appId: "1:841384345182:web:d9a3eda9b93a27a44f3ecf",
    measurementId: "G-99HHMKBG8D"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //finkcja bierze usera i do ego obect z dodatkowymi inf
  if (!userAuth) return;
 // if userah object does  no exis
  // const userRef = firestore.doc('user/123sdmkdmsdd');
  //snapshot jus shows the data but the documentref iforfor crud operations, creang etc
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};







export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// const fcbAuth = auth.getAuth();
facebookProvider.setCustomParameters({
    'display': 'popup'
  });

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoolge = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider).then((result) => {
    //window.location.assign('./profile')
    // // The signed-in user info.
    const user = result.user;
    return user

    // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // const credential = facebookProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;

    // // ...
  })
  .catch((error) => {
      console.error(error);
      return error
    // // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.email;
    // // The AuthCredential type that was used.
    // const credential = facebookProvider.credentialFromError(error);

    // // ...
  });


export default firebase;