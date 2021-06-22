import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ExpenseModel } from "./models/ExpenseModel";
import * as utils from "./utils";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//  firebase emulators:export db
//  firebase emulators:start --import db

admin.initializeApp();

export const expenseDocUpdated = functions.firestore
  .document("Companies/{companyID}/Expense/{expenseDocID}")
  .onUpdate((change, context) => {
    const expenseDoc = change.after.data();
    if (expenseDoc != null) {
      console.log("Data: ", expenseDoc);
      var expense = expenseDoc as ExpenseModel;
      if (utils.previousMonthData(expense.timestamp)) {
        console.log("Report Regenertion started");
      } else {
        console.log("Ignoring current month data");
      }
    }
    return Promise.resolve();
  });

export const tripDocUpdated = functions.firestore
  .document("Companies/{companyID}/Trip/{tripDocID}")
  .onUpdate((change, context) => {
    const tripDoc = change.after.data;
    if (tripDoc != null) {
      console.log(tripDoc);
      console.log(context.params.tripDocID);
    }
    return Promise.resolve();
  });

export const monthlyReport = functions.pubsub
  .schedule("0 0 1 * *")
  .onRun((context) => {
    console.log("Monthly Report Generator");
    return Promise.resolve();
  });
