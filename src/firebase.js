import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDF0s_Vm3kMIMUrGMGAi4VaKoxZtkBVfvU",
	authDomain: "whereismytutor-adb04.firebaseapp.com",
	projectId: "whereismytutor-adb04",
	storageBucket: "whereismytutor-adb04.appspot.com",
	messagingSenderId: "861980672056",
	appId: "1:861980672056:web:535c631076c4d0250da6cd",
	measurementId: "G-2FLEY1XFZC",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
