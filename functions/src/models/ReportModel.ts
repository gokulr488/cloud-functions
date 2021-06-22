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

// Converts JSON strings to/from your types
export class Convert {
  public static toReportModel(json: string): ReportModel {
    return JSON.parse(json);
  }

  public static reportModelToJson(value: ReportModel): string {
    return JSON.stringify(value);
  }
}
