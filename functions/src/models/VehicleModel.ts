// To parse this data:
//
//   import { Convert, VehicleModel } from "./file";
//
//   const vehicleModel = Convert.toVehicleModel(json);

export interface VehicleModel {
  VehicleName: string;
  RegistrationNo: string;
  Brand: string;
  CurrentDriver: string;
  TaxExpiryDate: number;
  InsuranceExpiryDate: number;
  LatestOdometerReading: number;
  CompanyId: string;
  IsInTrip: boolean;
  AllowedDrivers: string[];
  AvgMileage: number;
}

export const vehicleConverter = {
  toFirestore: (data: VehicleModel) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as VehicleModel,
};
