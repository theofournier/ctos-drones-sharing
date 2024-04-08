import { RentDrone } from "./rent.model";
import { Station } from "./station.model";

export type CrashDrone = {
  rentedDrone: RentDrone;
  crashDate: Date;
  returnStation: Station;
};
