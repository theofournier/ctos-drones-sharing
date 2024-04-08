import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Drone } from "../../services/models/drone.model";
import { getFlightTimeMin } from "../../utils/helpers";
import { Spacer } from "../utility/spacer.component";
import { DroneCharge } from "./drone-charge.component";

type Props = {
  drone: Drone;
  onPress: () => void;
};

const DroneContainer = styled(View)`
  background-color: #4e4e4e;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DroneInfoContainer = styled(View)``;

const DroneTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const DroneUnlockContainer = styled(View)`
  align-items: center;
`;

const DroneUnlockText = styled(Text)`
  font-size: 12px;
  color: #ffffff;
`;

export const DroneListItem = ({ drone, onPress }: Props) => {
  return (
    <DroneContainer>
      <DroneInfoContainer>
        <DroneTitle>
          {drone.manufacturer} - {drone.model}
        </DroneTitle>
        <Spacer height={4} />
        <DroneCharge
          charge={drone.charge}
          flightTime={getFlightTimeMin(drone.maxFlightTime, drone.charge)}
          maxFlightTime={drone.maxFlightTime}
        />
      </DroneInfoContainer>
      <TouchableOpacity onPress={onPress}>
        <DroneUnlockContainer>
          <Ionicons name="lock-open" size={28} color="#49dbff" />
          <Spacer height={4} />
          <DroneUnlockText>Unlock drone</DroneUnlockText>
        </DroneUnlockContainer>
      </TouchableOpacity>
    </DroneContainer>
  );
};
