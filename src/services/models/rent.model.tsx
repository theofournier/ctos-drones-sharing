import { Drone } from "./drone.model";
import { Station } from "./station.model";

export type RentDrone = {
  drone: Drone;
  startStation: Station;
  startDate: Date;
  startCharge: number;
};
