import { Drone, transformDrone } from "./models/drone.model";
import { Station, transformStation } from "./models/station.model";
import stationsMock from "../mocks/stations.json";
import dronesMock from "../mocks/drones.json";
import { getRandomInt } from "../utils/helpers";

// Get the mock data : stations and drones
// Assign drones randomly to stations
export const getStations = async (): Promise<Station[]> => {
  console.log("GET STATIONS");
  // Get stations
  const stations: Station[] = [];
  stationsMock.stations.map((station) =>
    stations.push(transformStation(station))
  );

  // Get drones
  const drones: Drone[] = [];
  dronesMock.drones.map((drone) => drones.push(transformDrone(drone)));

  // Assign drone to station until drones list is empty
  while (drones.length > 0) {
    // Get a random station with free slots
    let stationIndex = getRandomInt(stations.length);
    while (
      stations[stationIndex].drones.length >= stations[stationIndex].slotNumbers
    ) {
      stationIndex = getRandomInt(stations.length);
    }

    // Get random drone and remove it from the drones list
    let droneIndex = getRandomInt(drones.length);
    const drone = drones.splice(droneIndex, 1)[0];

    // Add drone to station
    stations[stationIndex].drones.push(drone);
  }

  console.log(stations);

  return stations;
};
