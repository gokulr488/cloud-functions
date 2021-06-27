import * as admin from "firebase-admin";
export interface TripModel {
  id: string;
  DriverName: string;
  DriverUid: string;
  StartDate: admin.firestore.Timestamp;
  EndDate: admin.firestore.Timestamp;
  StartReading: number;
  EndReading: number;
  Distance: number;
  BillAmount: number;
  PaidAmount: number;
  BalanceAmount: number;
  DriverSalary: number;
  CustomerName: string;
  CustomerPhone: string;
  TripNo: string;
  VehicleRegNo: string;
  StartingFrom: string;
  Destination: string;
  Status: string;
  IsRoundTrip: boolean;
}

export const tripConverter = {
  toFirestore: (data: TripModel) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as TripModel,
};

export function getTripsFrom(
  snapShot: FirebaseFirestore.QuerySnapshot<TripModel>
): TripModel[] {
  var trips: TripModel[] = [];
  snapShot.forEach(function (snap) {
    trips.push(snap.data());
  });
  return trips;
}
