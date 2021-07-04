import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ExpenseModel } from "./models/ExpenseModel";
import * as utils from "./utils";
import * as reportBuilder from "./service/ReportGeneratorService";
import { TripModel } from "./models/TripModel";

//"npm --prefix \"$RESOURCE_DIR\" run lint",
//  firebase emulators:export db
//  firebase emulators:start --import db
//  npm run build
//  firebase deploy --only functions

admin.initializeApp();

export const expenseDocUpdated = functions
  .region("asia-east2")
  .firestore.document("Companies/{companyID}/Expense/{expenseDocID}")
  .onUpdate((change, context) => {
    const afterDoc = change.after.data() as ExpenseModel;
    const beforeDoc = change.before.data() as ExpenseModel;
    if (afterDoc != null) {
      if (utils.previousMonthData(afterDoc.timestamp)) {
        console.log("Report Regenertion started for Expense Update");
        reportBuilder.regenReportWithExpense(
          beforeDoc,
          afterDoc,
          context.params.companyID
        );
      } else {
        console.log("Ignoring current month data");
      }
    }
  });

export const tripDocUpdated = functions
  .region("asia-east2")
  .firestore.document("Companies/{companyID}/Trip/{tripDocID}")
  .onUpdate((change, context) => {
    const afterDoc = change.after.data() as TripModel;
    const beforeDoc = change.before.data() as TripModel;
    if (afterDoc != null) {
      if (utils.previousMonthData(afterDoc.StartDate)) {
        console.log("Report Regenertion started for Trip Update");
        reportBuilder.regenReportWithTrip(
          beforeDoc,
          afterDoc,
          context.params.companyID
        );
      } else {
        console.log("Ignoring current month data");
      }
    }
  });

export const monthlyReportTester = functions
  .region("asia-east2")
  .https.onRequest((req, res) => {
    console.log("Monthly Report Generator");
    reportBuilder.genMonthlyReportForAllVehicles();
  });

export const monthlyReport = functions
  .region("asia-east2")
  .pubsub.schedule("0 0 1 * *")
  .onRun((context) => {
    console.log("Monthly Report Generator");
    reportBuilder.genMonthlyReportForAllVehicles();
  });
