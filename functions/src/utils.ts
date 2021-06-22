import * as admin from "firebase-admin";

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
