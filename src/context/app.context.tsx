import React, { createContext, useEffect, useReducer } from "react";
import moment from "moment";
import { Drone } from "../services/models/drone.model";
import { RentDrone } from "../services/models/rent.model";
import { Station } from "../services/models/station.model";
import { getStations } from "../services/station.service";
import { ActionType, Action, AppStateType, appReducer } from "./app.reducer";
import {
  getFlightTime,
  getRentCharge,
  getRentEndDate,
  getTimeRemaining,
} from "../utils/helpers";

const initialState: AppStateType = {
  stations: [],
  isLoadingStations: false,
};

export type AppContextType = {
  dispatch: (action: Action) => void;
  state: AppStateType;
  rentDrone: (station: Station, drone: Drone) => void;
  returnDrone: (station: Station) => void;
  readCrash: () => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Get the stations and the drones from the mock data
  const loadStations = async () => {
    console.log("LOAD STATIONS");
    try {
      // Set isLoading to true
      dispatch({ type: ActionType.LOADING_STATIONS });

      const stations = await getStations();

      // Await 3 seconds to display splash screen
      await new Promise((resolve) => setTimeout(resolve, 3000));

      dispatch({ type: ActionType.STATIONS, payload: stations });
      console.log("STATIONS LOADED");
    } catch (e) {
      dispatch({ type: ActionType.ERROR_LOADING_STATIONS });
      console.log("ERROR LOADING STATIONS");
    }
  };

  // Create rented drone object from the station and drone
  // Start crash timeout
  const rentDrone = (station: Station, drone: Drone) => {
    console.log("RENT DRONE");
    try {
      const rentedDrone: RentDrone = {
        drone: drone,
        startStation: station,
        startCharge: drone.charge,
        startDate: moment().toDate(),
      };
      const timerId = setCrashTimeout(rentedDrone);
      dispatch({
        type: ActionType.RENT_DRONE,
        payload: {
          stationId: station.id,
          droneModel: drone.model,
          rentedDrone,
          crashDroneTimerId: timerId,
        },
      });
      console.log("DRONE RENTED");
    } catch (e) {
      console.log("ERROR RENTING DRONE");
    }
  };

  // Return the drone to the station
  const returnDrone = (station: Station) => {
    if (state.rentedDrone) {
      console.log("RETURN DRONE");
      try {
        // Get the new charge of the drone
        const charge = getRentCharge(
          state.rentedDrone.startCharge,
          state.rentedDrone.startDate,
          state.rentedDrone.drone.maxFlightTime
        );
        // Clear timeout
        clearCrashTimeout();

        dispatch({
          type: ActionType.RETURN_DRONE,
          payload: {
            stationId: station.id,
            charge,
          },
        });
        console.log("DRONE RETURNED");
      } catch (e) {
        console.log("ERROR RETURNING DRONE");
      }
    }
  };

  // Calculate the flight time and start timeout
  const setCrashTimeout = (
    rentedDrone: RentDrone
  ): ReturnType<typeof setTimeout> => {
    console.log("SET CRASH TIMEOUT");
    const flightTime = getFlightTime(
      rentedDrone.drone.maxFlightTime,
      rentedDrone.startCharge
    );
    const rentEndDate = getRentEndDate(flightTime, rentedDrone.startDate);
    const timeRemaining = getTimeRemaining(rentEndDate);

    return setTimeout(() => crashDrone(), timeRemaining);
  };

  const clearCrashTimeout = () => {
    console.log("CLEAR CRASH TIMEOUT");
    if (state.crashDroneTimerId) {
      clearTimeout(state.crashDroneTimerId);
    }
  };

  // Set the crash drone and clear timeout
  const crashDrone = () => {
    console.log("CRASH DRONE");
    try {
      clearCrashTimeout();
      dispatch({
        type: ActionType.CRASH_DRONE,
        payload: {
          crashDate: moment().toDate(),
        },
      });
      console.log("DRONE CRASHED");
    } catch (e) {
      console.log("ERROR CRASHING DRONE");
    }
  };

  const readCrash = () => {
    console.log("READ CRASH");
    try {
      dispatch({
        type: ActionType.CRASH_READ,
      });
      console.log("CRASH READ");
    } catch (e) {
      console.log("ERROR READING CRASH");
    }
  };

  // Load the stations the first time the app is launch
  useEffect(() => {
    loadStations();
  }, []);

  return (
    <AppContext.Provider
      value={{
        dispatch,
        state,
        rentDrone,
        returnDrone,
        readCrash,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
