import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ExpenseModel } from "./models/ExpenseModel";
import * as utils from "./service/utils";
import * as reportBuilder from "./service/ReportGeneratorService";
import { TripModel } from "./models/TripModel";

//"npm --prefix \"$RESOURCE_DIR\" run lint",
//  firebase emulators:export db
//  firebase emulators:start --inspect-functions --import db
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

export const monthlyReportBuilder = functions
  .region("asia-east2")
  .https.onRequest((req, res) => {
    //http://localhost:5001/fleezy-7d63e/asia-east2/monthlyReportBuilder?date=21-Jul-2021
    if (req.query.date == undefined) {
      res.status(400).send("specify date eg:date=21-Jul-2021");
      return;
    } else {
      const timeInMilli = Date.parse(req.query.date.toString());
      const date = new Date(timeInMilli);
      if (isNaN(timeInMilli) || timeInMilli < 1577840400000) {
        res
          .status(400)
          .send(
            "Invalid Date. Try eg:date=21-Jul-2021<BR>Date should be greater than 2020 Jan"
          );
        return;
      }
      reportBuilder.genMonthlyReportForAllVehicles(date);
      res.status(200).send("OK");
    }
  });

// export const cronTester = functions
//   .region("asia-east2")
//   .https.onRequest((req, res) => {
//     reportBuilder.genMonthlyReportForAllVehicles(undefined);
//     res.status(200).send("OK");
//   });

export const monthlyReport = functions
  .region("asia-east2")
  .pubsub.schedule("0 0 1 * *")
  .onRun((context) => {
    console.log("Monthly Report Generator");
    reportBuilder.genMonthlyReportForAllVehicles(undefined);
  });
