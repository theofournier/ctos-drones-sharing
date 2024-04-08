import { CrashDrone } from "../../services/models/crash.model";
import { Drone } from "../../services/models/drone.model";
import { RentDrone } from "../../services/models/rent.model";
import { Station } from "../../services/models/station.model";
import { ActionType, appReducer, AppStateType } from "../app.reducer";

const initialState: AppStateType = {
  stations: [],
  isLoadingStations: false,
};

const mockDrone: Drone = {
  manufacturer: "Parrot",
  model: "Anafi",
  maxFlightTime: 30,
  charge: 50,
};

const mockStation: Station = {
  id: "kingcrossstation",
  name: "King's Cross Station",
  description:
    "King's Cross railway station is a now defunct passenger railway terminus in the London Borough of Camden, on the edge of Central London.",
  images: ["KingCrossStation.png", "KingCrossStation_Drone.png"],
  slotNumbers: 10,
  drones: [mockDrone],
};

const mockStations: Station[] = [mockStation];

const mockRentedDrone: RentDrone = {
  drone: mockDrone,
  startCharge: 50,
  startDate: new Date(2021, 8, 19, 15, 0, 0),
  startStation: mockStation,
};

describe("LOADING_STATIONS", () => {
  it("should return isLoadingStations true", () => {
    const state = appReducer(initialState, {
      type: ActionType.LOADING_STATIONS,
    });

    expect(state.isLoadingStations).toBeTruthy();
    expect(state.stations).toStrictEqual([]);
  });
});

describe("STATIONS", () => {
  it("should return stations and isLoadingStations false", () => {
    const state = appReducer(initialState, {
      type: ActionType.STATIONS,
      payload: mockStations,
    });

    expect(state.isLoadingStations).toBeFalsy();
    expect(state.stations).toStrictEqual(mockStations);
  });
});

describe("ERROR_LOADING_STATIONS", () => {
  it("should return isLoadingStations false ", () => {
    const state = appReducer(initialState, {
      type: ActionType.ERROR_LOADING_STATIONS,
    });

    expect(state.isLoadingStations).toBeFalsy();
    expect(state.stations).toStrictEqual([]);
  });
});

describe("RENT_DRONE", () => {
  it("should return state with drone rented", () => {
    const stateBeforeRented: AppStateType = {
      stations: mockStations,
      isLoadingStations: false,
    };

    const state = appReducer(stateBeforeRented, {
      type: ActionType.RENT_DRONE,
      payload: {
        rentedDrone: mockRentedDrone,
        droneModel: mockRentedDrone.drone.model,
        stationId: mockStation.id,
        crashDroneTimerId: 10 as unknown as ReturnType<typeof setTimeout>,
      },
    });

    const station = { ...mockStation, drones: [] };

    expect(state.crashedDrone).toBeUndefined();
    expect(state.crashDroneTimerId).toBe(10);
    expect(state.rentedDrone).toStrictEqual(mockRentedDrone);
    expect(state.stations).toStrictEqual([station]);
  });
});

describe("RETURN_DRONE", () => {
  it("should return state with drone returned", () => {
    const stateBeforeReturning: AppStateType = {
      stations: [{ ...mockStation, drones: [] }],
      isLoadingStations: false,
      rentedDrone: mockRentedDrone,
    };

    const state = appReducer(stateBeforeReturning, {
      type: ActionType.RETURN_DRONE,
      payload: {
        stationId: mockStation.id,
        charge: 25,
      },
    });

    // Change charge
    const drone = { ...mockRentedDrone.drone, charge: 25 };
    // Return drone to station
    const station = { ...mockStation, drones: [drone] };

    expect(state.rentedDrone).toBeUndefined();
    expect(state.stations).toStrictEqual([station]);
  });
});

describe("CRASH_DRONE", () => {
  it("should return state with drone crashed", () => {
    const stateBeforeCrash: AppStateType = {
      stations: [{ ...mockStation, drones: [] }],
      isLoadingStations: false,
      rentedDrone: mockRentedDrone,
    };

    // Mock random to set the station index
    jest.spyOn(global.Math, "random").mockImplementationOnce(() => 0);

    const state = appReducer(stateBeforeCrash, {
      type: ActionType.CRASH_DRONE,
      payload: {
        crashDate: new Date(2021, 8, 19, 15, 10, 0),
      },
    });

    // Change charge
    const drone = { ...mockRentedDrone.drone, charge: 0 };
    // Return drone to station
    const station = { ...mockStation, drones: [drone] };
    // Create crash drone
    const crashedDrone: CrashDrone = {
      rentedDrone: mockRentedDrone,
      crashDate: new Date(2021, 8, 19, 15, 10, 0),
      returnStation: { ...mockStation, drones: [] },
    };

    expect(state.rentedDrone).toBeUndefined();
    expect(state.stations).toStrictEqual([station]);
    expect(state.crashedDrone).toStrictEqual(crashedDrone);
  });
});

describe("CRASH_READ", () => {
  it("should return crashedDrone undefined ", () => {
    const stateAfterCrash: AppStateType = {
      stations: mockStations,
      isLoadingStations: false,
      crashedDrone: {
        rentedDrone: mockRentedDrone,
        crashDate: new Date(2021, 8, 19, 15, 10, 0),
        returnStation: { ...mockStation, drones: [] },
      },
    };
    const state = appReducer(stateAfterCrash, {
      type: ActionType.CRASH_READ,
    });

    expect(state.crashedDrone).toBeUndefined();
  });
});
