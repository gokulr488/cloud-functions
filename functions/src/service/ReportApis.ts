import { reportConverter, ReportModel } from "../models/ReportModel";
import * as admin from "firebase-admin";
import * as Constants from "./Constants";

export async function writeReportDoc(report: ReportModel, companyId: string) {
  await admin
    .firestore()
    .collection(Constants.COMPANIES)
    .doc(companyId)
    .collection(Constants.REPORT)
    .withConverter(reportConverter)
    .doc(report.reportId)
    .set(report);
  console.log("Report Written to DB");
}
