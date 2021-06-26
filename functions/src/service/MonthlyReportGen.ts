import * as admin from "firebase-admin";
import { VehicleModel, vehicleConverter } from "../models/VehicleModel";

export async function getAllVehicles(): Promise<VehicleModel[]> {
  var vehicles: VehicleModel[] = [];

  const snapShot = await admin
    .firestore()
    .collection("Vehicles")
    .withConverter(vehicleConverter)
    .get();

  snapShot.forEach(function (snap) {
    vehicles.push(snap.data());
  });

  return vehicles;
}
