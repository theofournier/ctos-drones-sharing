import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Spacer } from "../utility/spacer.component";
import { Charge } from "./charge.components";

type Props = {
  charge: number;
  flightTime: number;
  maxFlightTime: number;
};

const ChargeContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const ChargeTimeText = styled(Text)`
  font-size: 16px;
  color: #ffffff;
`;

export const DroneCharge = ({ charge, flightTime, maxFlightTime }: Props) => {
  return (
    <ChargeContainer>
      <Charge
        charge={charge}
        radius={15}
        fontColor="#ffffff"
        bgColor="#4e4e4e"
      />
      <Spacer width={16} />
      <ChargeTimeText>
        {flightTime}
        {" / "}
        {maxFlightTime} min
      </ChargeTimeText>
    </ChargeContainer>
  );
};
