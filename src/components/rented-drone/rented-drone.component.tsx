import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { RentDrone } from "../../services/models/rent.model";
import {
  convertMillisecondsToMinSec,
  getFlightTime,
  getRentEndDate,
} from "../../utils/helpers";
import { Countdown } from "./countdown.component";
import { Spacer } from "../utility/spacer.component";

type Props = {
  rentedDrone: RentDrone;
};

const RentedDroneContainer = styled(View)`
  background-color: #3f3f3f;
  padding-top: 8px;
  border-color: #707070;
  border-top-width: 1px;
`;

const RentedDroneCenterContainer = styled(View)`
  align-items: center;
`;

const RentedDroneText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
`;

const RentedDroneFlightContainer = styled(View)`
  padding: 16px;
`;
const RentedDroneStationContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const RentedDroneTimeContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RentedDroneTimeDivider = styled(View)`
  background-color: #ffffff;
  width: 1px;
  height: 100%;
`;

export const RentedDrone = ({ rentedDrone }: Props) => {
  const flightTime = getFlightTime(
    rentedDrone.drone.maxFlightTime,
    rentedDrone.startCharge
  );
  const endDate = getRentEndDate(flightTime, rentedDrone.startDate);
  const time = convertMillisecondsToMinSec(flightTime);

  return (
    <RentedDroneContainer>
      <RentedDroneCenterContainer>
        <Countdown
          endDate={endDate}
          startCharge={rentedDrone.startCharge}
          startDate={rentedDrone.startDate}
          maxFlightTimeMin={rentedDrone.drone.maxFlightTime}
        />
        <Spacer height={4} />
        <RentedDroneText>
          {rentedDrone.drone.manufacturer} - {rentedDrone.drone.model}
        </RentedDroneText>
      </RentedDroneCenterContainer>
      <RentedDroneFlightContainer>
        <RentedDroneStationContainer>
          <Ionicons name="location-sharp" size={28} color="#49dbff" />
          <Spacer width={8} />
          <RentedDroneText>{rentedDrone.startStation.name}</RentedDroneText>
        </RentedDroneStationContainer>
        <Spacer height={8} />
        <RentedDroneTimeContainer>
          <Ionicons name="time-outline" size={28} color="#49dbff" />
          <Spacer width={8} />
          <View>
            <RentedDroneText>
              {moment(rentedDrone.startDate).format("L")}
            </RentedDroneText>
            <Spacer height={4} />
            <RentedDroneText>
              From {moment(rentedDrone.startDate).format("LT")}
            </RentedDroneText>
            <Spacer height={2} />
            <RentedDroneText>To {moment(endDate).format("LT")}</RentedDroneText>
          </View>
          <Spacer width={16} />
          <RentedDroneTimeDivider />
          <Spacer width={16} />
          <View>
            <RentedDroneText>Max flight time</RentedDroneText>
            <RentedDroneText>{time} min</RentedDroneText>
          </View>
        </RentedDroneTimeContainer>
      </RentedDroneFlightContainer>
    </RentedDroneContainer>
  );
};
