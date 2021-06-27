import * as admin from "firebase-admin";
import { defaultReport, ReportModel } from "../models/ReportModel";
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
import * as Constants from "./Constants";

export async function getAllVehicles(): Promise<VehicleModel[]> {
  const snapShot = await admin
    .firestore()
    .collection(Constants.VEHICLES)
    .withConverter(vehicleConverter)
    .get();
  var vehicles: VehicleModel[] = getVehiclesFrom(snapShot);
  return vehicles;
}

export async function generateReportFor(vehicle: VehicleModel) {
  // collect trips and expenses for the vehicle in previous month (find month start and end)
  // write report doc
  var reportID: String = utils.getReportID(vehicle.RegistrationNo);
  console.log("Generating Report: ", reportID);
  var report = defaultReport;
  report.reportId = reportID;

  var trips: TripModel[] = await getLastMonthTripsFor(vehicle);
  trips.forEach((trip) => {
    report = addTripToReport(trip, report);
  });
  var expenses: ExpenseModel[] = await getLastMonthExpensesFor(vehicle);
  expenses.forEach((expense) => {
    report = addExpenseToReport(expense, report);
  });
  console.log(report);
  return report;
}

async function getLastMonthTripsFor(
  vehicle: VehicleModel
): Promise<TripModel[]> {
  var lastMonth = utils.getLastMonth();
  var monthStart = utils.getStartOfMonth(lastMonth);
  var monthEnd = utils.getEndOfMonth(lastMonth);
  const snapShot = await admin
    .firestore()
    .collection(Constants.COMPANIES)
    .doc(vehicle.CompanyId)
    .collection(Constants.TRIP)
    .withConverter(tripConverter)
    .where("StartDate", ">=", monthStart)
    .where("StartDate", "<=", monthEnd)
    .get();
  var trips: TripModel[] = getTripsFrom(snapShot);
  console.log("Total Trip in ", lastMonth, " = ", trips.length);
  return trips;
}

async function getLastMonthExpensesFor(
  vehicle: VehicleModel
): Promise<ExpenseModel[]> {
  var lastMonth = utils.getLastMonth();
  var monthStart = utils.getStartOfMonth(lastMonth);
  var monthEnd = utils.getEndOfMonth(lastMonth);
  const snapShot = await admin
    .firestore()
    .collection(Constants.COMPANIES)
    .doc(vehicle.CompanyId)
    .collection(Constants.EXPENSE)
    .withConverter(expenseConverter)
    .where("timestamp", ">=", monthStart)
    .where("timestamp", "<=", monthEnd)
    .get();
  var expenses: ExpenseModel[] = getExpensesFrom(snapShot);
  console.log("Total Expenses in ", lastMonth, " = ", expenses.length);
  return expenses;
}
function addTripToReport(trip: TripModel, report: ReportModel): ReportModel {
  report.income += trip.BillAmount ?? 0;
  report.kmsTravelled += trip.Distance ?? 0;
  report.driverSal += trip.DriverSalary ?? 0;
  report.totalTrips++;

  if (trip.BalanceAmount != null && trip.BalanceAmount > 0) {
    report.pendingBal += trip.BalanceAmount;
    report.pendingPayTrips++;
  }
  if (trip.Status == Constants.CANCELLED) {
    report.cancelledTrips++;
  }
  return report;
}

function addExpenseToReport(
  expense: ExpenseModel,
  report: ReportModel
): ReportModel {
  report.expense += expense.amount ?? 0;
  if (expense.expenseType == Constants.FUEL) {
    report.fuelCost += expense.amount;
    report.ltrs += expense.fuelQty;
  }
  if (expense.expenseType == Constants.SERVICE) {
    report.serviceCost += expense.amount;
    report.noOfService++;
  }
  if (expense.expenseType == Constants.REPAIR) {
    report.repairCost += expense.amount;
  }
  if (expense.expenseType == Constants.SPARE_PARTS) {
    report.spareCost += expense.amount;
  }
  if (expense.expenseType == Constants.FINES) {
    report.fineCost += expense.amount;
    report.noOfFines++;
  }
  if (expense.expenseType == Constants.OTHER_EXP) {
    report.otherCost += expense.amount;
  }
  return report;
}
