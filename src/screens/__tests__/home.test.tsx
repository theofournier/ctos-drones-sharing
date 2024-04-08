import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { AppContext, AppContextType } from "../../context/app.context";
import { AppStateType } from "../../context/app.reducer";
import { Drone } from "../../services/models/drone.model";
import { RentDrone } from "../../services/models/rent.model";
import { Station } from "../../services/models/station.model";
import { HomeScreen } from "../home.screen";
import { Alert } from "react-native";

const mockDrone: Drone = {
  manufacturer: "Parrot",
  model: "Anafi",
  maxFlightTime: 30,
  charge: 50,
};
const mockDrone2: Drone = {
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
const mockStation2: Station = {
  id: "kingcrossstation2",
  name: "King's Cross Station 2",
  description:
    "King's Cross railway station is a now defunct passenger railway terminus in the London Borough of Camden, on the edge of Central London.",
  images: ["KingCrossStation.png", "KingCrossStation_Drone.png"],
  slotNumbers: 10,
  drones: [mockDrone2],
};

const mockStations: Station[] = [mockStation, mockStation2];

const mockRentedDrone: RentDrone = {
  drone: mockDrone,
  startCharge: 50,
  startDate: new Date(2021, 8, 19, 15, 0, 0),
  startStation: mockStation,
};

const mockStateRent = {
  stations: [{ ...mockStation, drones: [] }, mockStation2],
  isLoadingStations: false,
  rentedDrone: mockRentedDrone,
};

const initialState: AppStateType = {
  stations: mockStations,
  isLoadingStations: false,
};

const initialContext: AppContextType = {
  dispatch: jest.fn(),
  readCrash: jest.fn(),
  rentDrone: jest.fn(),
  returnDrone: jest.fn(),
  state: initialState,
};

const rootElement = (ui: any, value: AppContextType) => (
  <AppContext.Provider value={value}>{ui}</AppContext.Provider>
);

const customRender = (ui: any, value: AppContextType) => {
  return render(rootElement(ui, value));
};

const onPressStation = (getByText: (text: string | RegExp) => any) => {
  fireEvent.press(getByText("King's Cross Station"));
};
const onPressDrone = (getByText: (text: string | RegExp) => any) => {
  fireEvent.press(getByText("Unlock drone"));
};

const rentDrone = (getByText: (text: string | RegExp) => any) => {
  const spyAlert = jest.spyOn(Alert, "alert");

  onPressStation(getByText);
  onPressDrone(getByText);
  // @ts-ignore
  spyAlert.mock.calls[0][2][1].onPress();
};

const onPressStationAndUpdate = (
  context: AppContextType,
  getByText: (text: string | RegExp) => any,
  update: (
    nextElement: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    >
  ) => void
) => {
  onPressStation(getByText);

  // Update root with new state: rent drone
  update(rootElement(<HomeScreen />, context));
};

const onPressReturnDrone = (getByText: (text: string | RegExp) => any) => {
  fireEvent.press(getByText("Return here"));
};

const returnDrone = (getByText: (text: string | RegExp) => any) => {
  const spyAlert = jest.spyOn(Alert, "alert");

  onPressReturnDrone(getByText);
  // @ts-ignore
  spyAlert.mock.calls[0][2][1].onPress();
};

describe("<Home /> station list", () => {
  it("should shows station list", () => {
    const { getByText } = customRender(<HomeScreen />, initialContext);
    getByText("King's Cross Station");
    getByText("King's Cross Station 2");
  });

  it("should show drone list on press station", () => {
    const { getByText } = customRender(<HomeScreen />, initialContext);

    onPressStation(getByText);

    getByText("Parrot - Anafi");
    getByText("Unlock drone");
  });
});

describe("<Home /> rent drone", () => {
  it("should show alert on press unlock drone", () => {
    const { getByText } = customRender(<HomeScreen />, initialContext);
    jest.spyOn(Alert, "alert");

    onPressStation(getByText);
    onPressDrone(getByText);

    expect(Alert.alert).toBeCalled();
  });

  it("should call rent drone on press unlock drone", () => {
    const { getByText } = customRender(<HomeScreen />, initialContext);

    rentDrone(getByText);

    expect(initialContext.rentDrone).toBeCalledWith(mockStation, mockDrone);
  });

  it("should show rent info when drone rented", () => {
    const context = {
      ...initialContext,
      state: mockStateRent,
    };

    const { getByText } = customRender(<HomeScreen />, context);

    getByText("Max flight time");
  });

  it("should show return button when drone rented and station selected", () => {
    const context = {
      ...initialContext,
      state: mockStateRent,
    };

    const { getByText, update } = customRender(<HomeScreen />, initialContext);
    onPressStationAndUpdate(context, getByText, update);

    getByText("Return here");
  });

  it("should show return button disabled when drone rented and station selected but with no free slots", () => {
    const context = {
      ...initialContext,
      state: {
        ...mockStateRent,
        stations: [
          { ...mockStation, slotNumbers: 0, drones: [] },
          mockStation2,
        ],
      },
    };

    const { getByText, update } = customRender(<HomeScreen />, initialContext);
    onPressStationAndUpdate(context, getByText, update);

    getByText("No free slots");
  });
});

describe("<Home /> return drone", () => {
  it("should show alert on press return drone", () => {
    const context = {
      ...initialContext,
      state: mockStateRent,
    };

    const { getByText, update } = customRender(<HomeScreen />, initialContext);
    jest.spyOn(Alert, "alert");

    onPressStationAndUpdate(context, getByText, update);
    onPressReturnDrone(getByText);

    expect(Alert.alert).toBeCalled();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  xit("should call return drone on press return here", () => {
    const context = {
      ...initialContext,
      state: mockStateRent,
    };
    const { getByText, update } = customRender(<HomeScreen />, initialContext);

    onPressStationAndUpdate(context, getByText, update);
    returnDrone(getByText);

    expect(initialContext.returnDrone).toBeCalledWith(
      mockStateRent.stations[0]
    );
  });
});
