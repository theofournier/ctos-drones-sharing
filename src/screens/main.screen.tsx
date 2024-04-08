import React, { useContext } from "react";
import { AppContext, AppContextType } from "../context/app.context";
import { HomeScreen } from "./home.screen";
import { SplashScreen } from "./splash.screen";

export const MainScreen = () => {
  const {
    state: { isLoadingStations },
  } = useContext(AppContext) as AppContextType;

  if (isLoadingStations) {
    return <SplashScreen />;
  }

  return <HomeScreen />;
};
