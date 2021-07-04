import { ExpenseModel } from "../models/ExpenseModel";
import { ReportModel } from "../models/ReportModel";
import { getReportDoc, writeReportDoc } from "./ReportApis";
import * as admin from "firebase-admin";
import * as moment from "moment";
import * as Constants from "./Constants";

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
  report.expense += afterExp.amount - beforeExp.amount;
  if (beforeExp.expenseType == Constants.FUEL) {
    report.fuelCost += afterExp.amount - beforeExp.amount;
    report.ltrs += afterExp.fuelQty - beforeExp.fuelQty;
  }
  if (beforeExp.expenseType == Constants.SERVICE) {
    report.serviceCost += afterExp.amount - beforeExp.amount;
  }
  if (beforeExp.expenseType == Constants.REPAIR) {
    report.repairCost += afterExp.amount - beforeExp.amount;
  }
  if (beforeExp.expenseType == Constants.SPARE_PARTS) {
    report.spareCost += afterExp.amount - beforeExp.amount;
  }
  if (beforeExp.expenseType == Constants.FINES) {
    report.fineCost += afterExp.amount - beforeExp.amount;
  }
  if (beforeExp.expenseType == Constants.OTHER_EXP) {
    report.otherCost += afterExp.amount - beforeExp.amount;
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
