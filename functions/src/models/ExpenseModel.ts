import * as admin from "firebase-admin";

export interface ExpenseModel {
  expenseType: string;
  amount: number;
  odometerReading: number;
  fuelQty: number;
  payMode: String;
  policyNumber: number;
  taxExpiryDate: admin.firestore.Timestamp;
  tripNo: string;
  isFullTank: boolean;
  vehicleRegNo: string;
  driverName: string;
  fuelUnitPrice: number;
  insuranceExpiryDate: admin.firestore.Timestamp;
  timestamp: admin.firestore.Timestamp;
  expenseDetails: string;
}

export const expenseConverter = {
  toFirestore: (data: ExpenseModel) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as ExpenseModel,
};
export function getExpensesFrom(
  snapShot: FirebaseFirestore.QuerySnapshot<ExpenseModel>
): ExpenseModel[] {
  var expenses: ExpenseModel[] = [];
  snapShot.forEach(function (snap) {
    expenses.push(snap.data());
  });
  return expenses;
}
