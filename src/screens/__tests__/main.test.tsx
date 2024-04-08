import React from "react";
import { render } from "@testing-library/react-native";
import { AppContext, AppContextType } from "../../context/app.context";
import { AppStateType } from "../../context/app.reducer";
import { MainScreen } from "../main.screen";

const initialState: AppStateType = {
  stations: [],
  isLoadingStations: false,
};

const initialContext: AppContextType = {
  dispatch: jest.fn(),
  readCrash: jest.fn(),
  rentDrone: jest.fn(),
  returnDrone: jest.fn(),
  state: initialState,
};

const customRender = (ui: any, value: AppContextType) => {
  return render(<AppContext.Provider value={value}>{ui}</AppContext.Provider>);
};

describe("<Main />", () => {
  it("should shows splash screen when isLoadingStation is true", () => {
    const value = {
      ...initialContext,
      state: { ...initialContext.state, isLoadingStations: true },
    };

    const screen = customRender(<MainScreen />, value);

    expect(screen.queryByTestId("splash_screen")).not.toBeNull();
    expect(screen.queryByTestId("home_screen")).toBeNull();
  });

  it("should shows home screen when isLoadingStation is false", () => {
    const value = {
      ...initialContext,
      state: { ...initialContext.state, isLoadingStations: false },
    };

    const screen = customRender(<MainScreen />, value);

    expect(screen.queryByTestId("home_screen")).not.toBeNull();
    expect(screen.queryByTestId("splash_screen")).toBeNull();
  });
});
