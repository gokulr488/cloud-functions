import { ExpenseModel } from "../models/ExpenseModel";
import { ReportModel } from "../models/ReportModel";
import { getReportDoc, writeReportDoc } from "./ReportApis";
import * as admin from "firebase-admin";
import * as moment from "moment";
import * as Constants from "./Constants";
import { TripModel } from "../models/TripModel";

export async function regenReportWithExpense(
  before: ExpenseModel,
  after: ExpenseModel,
  companyId: string
): Promise<void> {
  var reportId: string = getReportId(before.vehicleRegNo, before.timestamp);
  var report: ReportModel = await getReportDoc(reportId, companyId);
  report = recalculateReport(report, before, after);
  writeReportDoc(report, companyId);
}

function recalculateReport(
  report: ReportModel,
  beforeExp: ExpenseModel,
  afterExp: ExpenseModel
): ReportModel {
  console.log("Recalculating report: ", report.reportId);
  report.expense += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  if (beforeExp.expenseType == Constants.FUEL) {
    report.fuelCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
    report.ltrs += (afterExp.fuelQty ?? 0) - (beforeExp.fuelQty ?? 0);
  }
  if (beforeExp.expenseType == Constants.SERVICE) {
    report.serviceCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  }
  if (beforeExp.expenseType == Constants.REPAIR) {
    report.repairCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  }
  if (beforeExp.expenseType == Constants.SPARE_PARTS) {
    report.spareCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  }
  if (beforeExp.expenseType == Constants.FINES) {
    report.fineCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  }
  if (beforeExp.expenseType == Constants.OTHER_EXP) {
    report.otherCost += (afterExp.amount ?? 0) - (beforeExp.amount ?? 0);
  }

  return report;
}

export async function regenReportWithTrip(
  before: TripModel,
  after: TripModel,
  companyId: string
) {
  var reportId: string = getReportId(before.VehicleRegNo, before.StartDate);
  var report: ReportModel = await getReportDoc(reportId, companyId);
  report = recalculateReportForTrip(report, before, after);
  writeReportDoc(report, companyId);
}

function recalculateReportForTrip(
  report: ReportModel,
  beforeTrip: TripModel,
  afterTrip: TripModel
): ReportModel {
  console.log("Recalculating report: ", report.reportId);

  report.income += (afterTrip.BillAmount ?? 0) - (beforeTrip.BillAmount ?? 0);
  report.kmsTravelled += (afterTrip.Distance ?? 0) - (beforeTrip.Distance ?? 0);
  report.driverSal +=
    (afterTrip.DriverSalary ?? 0) - (beforeTrip.DriverSalary ?? 0);

  if (beforeTrip.BalanceAmount != null && beforeTrip.BalanceAmount > 0) {
    report.pendingBal +=
      (afterTrip.BalanceAmount ?? 0) - (beforeTrip.BalanceAmount ?? 0);
    if ((afterTrip.BalanceAmount ?? 0) == 0) {
      report.pendingPayTrips--;
    }
  }
  return report;
}

function getReportId(
  regNo: string,
  timeStamp: admin.firestore.Timestamp
): string {
  var date: Date = new Date(timeStamp.toMillis());
  var reportId = regNo + "_" + moment(date).format("MMM-yyyy");
  return reportId;
}
