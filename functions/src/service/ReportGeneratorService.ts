// ReportID naming convention

// combined monthly report => MAY-2021
// vehicle monthly report  => KL-01-BQ-4086_MAY-2021

//combined Quarterly report=> JAN-MAR-2021
//vehicle Quarterly report=> KL-01-BQ-4086_JAN-MAR-2021

//combined yearly report  => 2021
//vehicle yearly report   =>KL-01-BQ-4086_2021

//import * as admin from "firebase-admin";
import { VehicleModel } from "../models/VehicleModel";
import * as monthlyReport from "./MonthlyReportGen";

export async function genMonthlyReportForAllVehicles(): Promise<void> {
  var vehicles: VehicleModel[] = await monthlyReport.getAllVehicles();
  vehicles.forEach(function (vehicle) {
    monthlyReport.generateReportFor(vehicle);
  });
}
