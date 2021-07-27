import * as admin from "firebase-admin";
import * as moment from "moment";

export function getStartOfMonth(date: Date): Date {
  var startDate: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  return startDate;
}
export function getEndOfMonth(date: Date): Date {
  var endDate: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endDate;
}

export function previousMonthData(
  timeStamp: admin.firestore.Timestamp
): boolean {
  var thisMonthStart: number = getStartOfMonth(new Date()).getTime();
  if (timeStamp.toMillis() < thisMonthStart) {
    return true;
  } else {
    return false;
  }
}

export function getReportID(regNo: string, date: Date): string {
  //KL-01-BQ-4086_MAY-2021
  var reportId: string = regNo + "_" + moment(date).format("MMM-yyyy");
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
