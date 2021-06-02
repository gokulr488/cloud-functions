import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const expenseDocUpdated = functions.firestore
  .document("Companies/{companyID}/Expense/{expenseDocID}")
  .onUpdate((change, context) => {
    const expenseDoc = change.after.data;
    if (expenseDoc != null) {
      console.log(expenseDoc);
      console.log(context.params.expenseDocID);
    }
  });

export const tripDocUpdated = functions.firestore
  .document("Companies/{companyID}/Trip/{tripDocID}")
  .onUpdate((change, context) => {
    const tripDoc = change.after.data;
    if (tripDoc != null) {
      console.log(tripDoc);
      console.log(context.params.tripDocID);
    }
  });
