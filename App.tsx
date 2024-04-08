import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { AppContextProvider } from "./src/context/app.context";
import { MainScreen } from "./src/screens/main.screen";

export default function App() {
  console.log("APP LOADED");
  return (
    <AppContextProvider>
      <RootSiblingParent>
        <PaperProvider>
          <MainScreen />
          <StatusBar style="light" />
        </PaperProvider>
      </RootSiblingParent>
    </AppContextProvider>
  );
}
