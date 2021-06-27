// To parse this data:
//
//   import { Convert, ReportModel } from "./file";
//
//   const reportModel = Convert.toReportModel(json);

export interface ReportModel {
  reportId: String;
  income: number;
  pendingBal: number;
  driverSal: number;
  expense: number;
  totalTrips: number;
  pendingPayTrips: number;
  cancelledTrips: number;
  kmsTravelled: number;
  fuelCost: number;
  ltrs: number;
  serviceCost: number;
  repairCost: number;
  spareCost: number;
  noOfService: number;
  noOfFines: number;
  fineCost: number;
  otherCost: number;
}

export const reportConverter = {
  toFirestore: (data: ReportModel) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as ReportModel,
};
export function getReportsFrom(
  snapShot: FirebaseFirestore.QuerySnapshot<ReportModel>
): ReportModel[] {
  var reports: ReportModel[] = [];
  snapShot.forEach(function (snap) {
    reports.push(snap.data());
  });
  return reports;
}

export const defaultReport = {
  cancelledTrips: 0,
  driverSal: 0,
  expense: 0,
  fineCost: 0,
  fuelCost: 0,
  income: 0,
  kmsTravelled: 0,
  ltrs: 0,
  noOfFines: 0,
  noOfService: 0,
  otherCost: 0,
  pendingBal: 0,
  pendingPayTrips: 0,
  repairCost: 0,
  serviceCost: 0,
  spareCost: 0,
  totalTrips: 0,
} as ReportModel;
