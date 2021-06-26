import * as admin from "firebase-admin";
import * as moment from "moment";

export function getStartOfMonth(date: Date): number {
  console.log("Today :", date);
  var startDate: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  console.log(
    "Start of month :",
    startDate,
    "timeStamp :",
    startDate.getTime()
  );
  return startDate.getTime();
}

export function previousMonthData(
  timeStamp: admin.firestore.Timestamp
): boolean {
  console.log(timeStamp);
  var thisMonthStart: number = getStartOfMonth(new Date());
  console.log("Millis: ", timeStamp.toMillis());
  if (timeStamp.toMillis() < thisMonthStart) {
    return true;
  } else {
    return false;
  }
}

export function getReportID(regNo: String): String {
  //KL-01-BQ-4086_MAY-2021
  var lastMonth: Date = getLastMonth();
  var reportId: String = regNo + "_" + moment(lastMonth).format("MMM-yyyy");
  return reportId;
}

export function getLastMonth(): Date {
  var now: Date = new Date();
  var lastMonth: Date;
  if (now.getMonth() == 0) {
    lastMonth = new Date(now.getFullYear() - 1, 11);
  } else {
    lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  }
  return lastMonth;
}
