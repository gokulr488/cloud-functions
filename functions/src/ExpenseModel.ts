// To parse this data:
//
//   import { Convert, ExpenseModel } from "./file";
//
//   const expenseModel = Convert.toExpenseModel(json);

export interface ExpenseModel {
  expenseType?: string;
  amount?: number;
  odometerReading?: number;
  fuelQty?: null;
  payMode?: null;
  policyNumber?: null;
  taxExpiryDate?: null;
  tripNo?: string;
  isFullTank?: null;
  vehicleRegNo?: string;
  driverName?: string;
  fuelUnitPrice?: null;
  insuranceExpiryDate?: null;
  timestamp?: number;
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
