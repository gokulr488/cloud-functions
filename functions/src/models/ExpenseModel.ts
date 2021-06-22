import * as admin from "firebase-admin";

export interface ExpenseModel {
  expenseType?: string;
  amount?: number;
  odometerReading?: number;
  fuelQty?: number;
  payMode?: String;
  policyNumber?: number;
  taxExpiryDate?: admin.firestore.Timestamp;
  tripNo?: string;
  isFullTank?: boolean;
  vehicleRegNo?: string;
  driverName?: string;
  fuelUnitPrice?: number;
  insuranceExpiryDate?: admin.firestore.Timestamp;
  timestamp: admin.firestore.Timestamp;
  expenseDetails?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toExpenseModel(json: string): ExpenseModel {
    return JSON.parse(json);
  }

  public static expenseModelToJson(value: ExpenseModel): string {
    return JSON.stringify(value);
  }
}
