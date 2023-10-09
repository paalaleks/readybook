const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.createUser = functions.auth.user().onCreate((user) => {
  const newUser = {
    uid: user.uid,
    email: user.email,
    displayName: "",
    photoUrl: "",
    providerData: user.providerData,
  };

  db.collection("users").doc(user.uid).set(newUser);
});
