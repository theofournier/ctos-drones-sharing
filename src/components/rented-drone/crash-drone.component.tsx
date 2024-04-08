import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { CrashDrone } from "../../services/models/crash.model";
import { Button } from "react-native-paper";
import moment from "moment";
import { Spacer } from "../utility/spacer.component";

type Props = {
  crashedDrone: CrashDrone;
  readCrash: () => void;
};

const CrashDroneModalContainer = styled(View)`
  width: 80%;
  align-self: center;
  align-items: center;
  background-color: #ffffff;
  padding: 24px;
`;

const CrashDroneModalTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;
const CrashDroneModalDescription = styled(Text)`
  font-size: 18px;
  text-align: center;
`;

export const CrashDroneModal = ({ crashedDrone, readCrash }: Props) => {
  return (
    <CrashDroneModalContainer>
      <Ionicons name="battery-dead" size={40} color="#ff0000" />
      <Spacer height={4} />
      <CrashDroneModalTitle>Drone crashed</CrashDroneModalTitle>
      <Spacer height={4} />
      <CrashDroneModalDescription>
        Your drone run out of battery. It was sent to the station{" "}
        {crashedDrone.returnStation.name}.
      </CrashDroneModalDescription>
      <Spacer height={24} />
      <CrashDroneModalDescription>
        {crashedDrone.rentedDrone.drone.manufacturer} -{" "}
        {crashedDrone.rentedDrone.drone.model}
      </CrashDroneModalDescription>
      <Spacer height={8} />
      <CrashDroneModalDescription>
        Started at {moment(crashedDrone.rentedDrone.startDate).format("LT")}
      </CrashDroneModalDescription>
      <CrashDroneModalDescription>
        Crashed at {moment(crashedDrone.crashDate).format("LT")}
      </CrashDroneModalDescription>
      <Spacer height={24} />
      <Button color="#49dbff" onPress={readCrash}>
        Dismiss
      </Button>
    </CrashDroneModalContainer>
  );
};
