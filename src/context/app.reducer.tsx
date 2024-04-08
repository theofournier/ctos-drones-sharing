import { CrashDrone } from "../services/models/crash.model";
import { RentDrone } from "../services/models/rent.model";
import { Station } from "../services/models/station.model";
import { getRandomInt } from "../utils/helpers";

export type AppStateType = {
  stations: Station[];
  isLoadingStations: boolean;
  rentedDrone?: RentDrone;
  crashDroneTimerId?: ReturnType<typeof setTimeout>;
  crashedDrone?: CrashDrone;
};

export enum ActionType {
  LOADING_STATIONS,
  STATIONS,
  ERROR_LOADING_STATIONS,
  RENT_DRONE,
  RETURN_DRONE,
  CRASH_DRONE,
  CRASH_READ,
}

export type Action =
  | { type: ActionType.LOADING_STATIONS }
  | { type: ActionType.STATIONS; payload: Station[] }
  | { type: ActionType.ERROR_LOADING_STATIONS }
  | {
      type: ActionType.RENT_DRONE;
      payload: {
        rentedDrone: RentDrone;
        droneModel: string;
        stationId: string;
        crashDroneTimerId: ReturnType<typeof setTimeout>;
      };
    }
  | {
      type: ActionType.RETURN_DRONE;
      payload: {
        stationId: string;
        charge: number;
      };
    }
  | {
      type: ActionType.CRASH_DRONE;
      payload: {
        crashDate: Date;
      };
    }
  | { type: ActionType.CRASH_READ };

// Function that set the rented drone to undefined
// and add it to the specified station
const returnDrone = (
  state: AppStateType,
  stationId: string,
  charge: number
) => {
  const drone = state.rentedDrone?.drone;
  if (!drone) {
    return state;
  }
  const stations = state.stations.map((station) => {
    if (station.id !== stationId) {
      return station;
    }
    return {
      ...station,
      drones: [...station.drones, { ...drone, charge }],
    };
  });

  return { rentedDrone: undefined, stations: stations };
};

export const appReducer = (
  state: AppStateType,
  action: Action
): AppStateType => {
  switch (action.type) {
    case ActionType.LOADING_STATIONS:
      return { ...state, isLoadingStations: true };
    case ActionType.STATIONS:
      return { ...state, stations: action.payload, isLoadingStations: false };
    case ActionType.ERROR_LOADING_STATIONS:
      return { ...state, isLoadingStations: false };
    case ActionType.RENT_DRONE:
      return {
        ...state,
        crashedDrone: undefined,
        crashDroneTimerId: action.payload.crashDroneTimerId,
        rentedDrone: action.payload.rentedDrone,
        stations: state.stations.map((station) => {
          if (station.id !== action.payload.stationId) {
            return station;
          }
          return {
            ...station,
            drones: [
              ...station.drones.filter(
                (drone) => drone.model !== action.payload.droneModel
              ),
            ],
          };
        }),
      };
    case ActionType.RETURN_DRONE:
      return {
        ...state,
        ...returnDrone(state, action.payload.stationId, action.payload.charge),
      };
    case ActionType.CRASH_DRONE:
      // Get station with free slots
      // Select a random station
      // Return the drone to this station
      if (state.rentedDrone) {
        const freeStations = state.stations.filter(
          (station) => station.drones.length < station.slotNumbers
        );
        const index = getRandomInt(freeStations.length);

        const crashedDrone: CrashDrone = {
          rentedDrone: state.rentedDrone,
          crashDate: action.payload.crashDate,
          returnStation: freeStations[index],
        };

        return {
          ...state,
          ...returnDrone(state, freeStations[index].id, 0),
          crashedDrone: crashedDrone,
        };
      }
      return state;
    case ActionType.CRASH_READ:
      return { ...state, crashedDrone: undefined };
    default:
      return state;
  }
};
