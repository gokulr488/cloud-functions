// To parse this data:
//
//   import { Convert, TripModel } from "./file";
//
//   const tripModel = Convert.toTripModel(json);

export interface TripModel {
  id: string;
  driverName: string;
  driverUid: string;
  startDate: number;
  endDate: number;
  startReading: number;
  endReading: number;
  distance: number;
  billAmount: number;
  paidAmount: number;
  balanceAmount: number;
  driverSalary: number;
  customerName: string;
  customerPhone: string;
  tripNo: string;
  vehicleRegNo: string;
  startingFrom: string;
  destination: string;
  status: string;
  isRoundTrip: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toTripModel(json: string): TripModel {
    return JSON.parse(json);
  }

  public static tripModelToJson(value: TripModel): string {
    return JSON.stringify(value);
  }
}
