import * as admin from "firebase-admin";
import { ReportModel } from "../models/ReportModel";
import * as utils from "../utils";
import {
  VehicleModel,
  vehicleConverter,
  getVehiclesFrom,
} from "../models/VehicleModel";
import { getTripsFrom, tripConverter, TripModel } from "../models/TripModel";
import {
  expenseConverter,
  ExpenseModel,
  getExpensesFrom,
} from "../models/ExpenseModel";

export async function getAllVehicles(): Promise<VehicleModel[]> {
  const snapShot = await admin
    .firestore()
    .collection("Vehicles")
    .withConverter(vehicleConverter)
    .get();
  var vehicles: VehicleModel[] = getVehiclesFrom(snapShot);
  return vehicles;
}

export async function generateReportFor(vehicle: VehicleModel) {
  // collect trips and expenses for the vehicle in previous month (find month start and end)
  // generate report from trips and expenses
  // write report doc
  var reportID: String = utils.getReportID(vehicle.RegistrationNo);
  console.log("Generating Report: ", reportID);
  var report = {} as ReportModel;
  var trips: TripModel[] = await getLastMonthTripsFor(vehicle);
  trips.forEach((trip) => {
    console.log(trip);
  });

  var expenses: ExpenseModel[] = await getLastMonthExpensesFor(vehicle);
  expenses.forEach((expense) => {
    console.log(expense);
  });
  return report;
}

async function getLastMonthTripsFor(
  vehicle: VehicleModel
): Promise<TripModel[]> {
  const snapShot = await admin
    .firestore()
    .collection("Companies")
    .doc(vehicle.CompanyId)
    .collection("Trip")
    .withConverter(tripConverter)
    .get();
  var trips: TripModel[] = getTripsFrom(snapShot);
  return trips;
}

async function getLastMonthExpensesFor(
  vehicle: VehicleModel
): Promise<ExpenseModel[]> {
  const snapShot = await admin
    .firestore()
    .collection("Companies")
    .doc(vehicle.CompanyId)
    .collection("Expense")
    .withConverter(expenseConverter)
    .get();
  var expenses: ExpenseModel[] = getExpensesFrom(snapShot);
  return expenses;
}
