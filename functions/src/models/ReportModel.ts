// To parse this data:
//
//   import { Convert, ReportModel } from "./file";
//
//   const reportModel = Convert.toReportModel(json);

export interface ReportModel {
  reportId?: string;
  income?: number;
  pendingBal?: number;
  driverSal?: number;
  expense?: number;
  totalTrips?: number;
  pendingPayTrips?: number;
  cancelledTrips?: number;
  kmsTravelled?: number;
  fuelCost?: number;
  ltrs?: number;
  serviceCost?: number;
  repairCost?: number;
  spareCost?: number;
  noOfService?: number;
  noOfFines?: number;
  fineCost?: number;
  otherCost?: number;
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
