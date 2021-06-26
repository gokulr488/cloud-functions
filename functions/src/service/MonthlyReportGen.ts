import * as admin from "firebase-admin";
import {
  VehicleModel,
  vehicleConverter,
  getVehiclesFrom,
} from "../models/VehicleModel";

export async function getAllVehicles(): Promise<VehicleModel[]> {
  const snapShot = await admin
    .firestore()
    .collection("Vehicles")
    .withConverter(vehicleConverter)
    .get();
  var vehicles: VehicleModel[] = getVehiclesFrom(snapShot);
  return vehicles;
}
