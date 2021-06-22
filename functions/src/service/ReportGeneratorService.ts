// ReportID naming convention

// combined monthly report => MAY-2021
// vehicle monthly report  => KL-01-BQ-4086_MAY-2021

//combined Quarterly report=> JAN-MAR-2021
//vehicle Quarterly report=> KL-01-BQ-4086_JAN-MAR-2021

//combined yearly report  => 2021
//vehicle yearly report   =>KL-01-BQ-4086_2021

import * as admin from "firebase-admin";

export function genMonthlyReportForAllVehicles(): void {
  // get list of all vehicles
  //iterate over each vehicle
  // build reportID for each vehicle
  // collect trips and expenses for the vehicle in previous month (find month start and end)
  // generate report from trips and expenses
  // write report doc
}
