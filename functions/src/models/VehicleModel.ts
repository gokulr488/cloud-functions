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
export function getVehiclesFrom(
  snapShot: FirebaseFirestore.QuerySnapshot<VehicleModel>
): VehicleModel[] {
  var vehicles: VehicleModel[] = [];
  snapShot.forEach(function (snap) {
    vehicles.push(snap.data());
  });
  return vehicles;
}
