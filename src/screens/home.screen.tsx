import React, { useContext, useState } from "react";
import { Alert, View } from "react-native";
import { AppContext, AppContextType } from "../context/app.context";
import { StationsList } from "../components/stations-list/stations-list.component";
import { DronesList } from "../components/drones-list/drones-list.component";
import { Station } from "../services/models/station.model";
import { Drone } from "../services/models/drone.model";
import { RentedDrone } from "../components/rented-drone/rented-drone.component";
import { SafeArea } from "../components/utility/safe-area.component";
import styled from "styled-components";
import { ReturnDrone } from "../components/rented-drone/return-drone.component";
import { CrashDroneModal } from "../components/rented-drone/crash-drone.component";
import { Modal, Portal } from "react-native-paper";
import { showDefaultToast } from "../utils/default-toast";
import { Welcome } from "../components/home/welcome.component";

const HomeBackground = styled(View)`
  flex: 1;
  background-color: #000000;
`;

const HomeContainer = styled(View)`
  flex: 1;
  justify-content: space-between;
`;

// Home screen with stations, drones, rent
export const HomeScreen = () => {
  const {
    state: { stations, rentedDrone, crashedDrone },
    rentDrone,
    returnDrone,
    readCrash,
  } = useContext(AppContext) as AppContextType;

  const [selectedStationId, setSelectedStationId] = useState<string>();

  // Get the selected station from the stations list
  const selectedStation = stations.find(
    (station) => station.id === selectedStationId
  ) as Station;

  const isSlotsFull =
    selectedStation &&
    selectedStation.drones.length >= selectedStation.slotNumbers;

  // Set or reset the selected station
  const onPressStation = (station: Station) =>
    selectedStationId === station.id
      ? setSelectedStationId(undefined)
      : setSelectedStationId(station.id);

  // Set the rented drone
  const onPressDrone = (drone: Drone) => {
    if (rentedDrone) {
      showDefaultToast("Already renting a drone");
      return;
    }
    if (drone.charge <= 10) {
      showDefaultToast("Drone battery too low (less than 10%)");
      return;
    }
    Alert.alert("Rent drone", `Rent the drone from ${selectedStation.name}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Rent", onPress: () => rentDrone(selectedStation, drone) },
    ]);
  };

  // Return the rented drone
  const onPressReturnDrone = () => {
    if (isSlotsFull) {
      showDefaultToast("Station full, no free slots");
      return;
    }
    Alert.alert("Return drone", `Return the drone to ${selectedStation.name}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Return", onPress: () => returnDrone(selectedStation) },
    ]);
  };

  return (
    <HomeBackground testID="home_screen">
      <SafeArea>
        <HomeContainer>
          <>
            <StationsList
              stations={stations}
              onPress={onPressStation}
              selectedStationId={selectedStationId}
            />
            {!selectedStation && !rentedDrone && <Welcome />}
            {selectedStationId && rentedDrone && (
              <ReturnDrone
                onPress={onPressReturnDrone}
                disabled={isSlotsFull}
              />
            )}
            {selectedStationId && (
              <DronesList
                drones={selectedStation.drones}
                onPress={onPressDrone}
              />
            )}
          </>
          {rentedDrone && <RentedDrone rentedDrone={rentedDrone} />}
        </HomeContainer>
      </SafeArea>

      {crashedDrone && (
        <Portal>
          <Modal visible={true} onDismiss={readCrash}>
            <CrashDroneModal
              crashedDrone={crashedDrone}
              readCrash={readCrash}
            />
          </Modal>
        </Portal>
      )}
    </HomeBackground>
  );
};
