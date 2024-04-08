import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import {
  getTimeRemaining,
  convertMillisecondsToMinSec,
  getRentCharge,
} from "../../utils/helpers";
import { Charge } from "../drones-list/charge.components";
import { Spacer } from "../utility/spacer.component";

type Props = {
  endDate: Date;
  startCharge: number;
  startDate: Date;
  maxFlightTimeMin: number;
};

const CountdownContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CountdownTitle = styled(Text)`
  flex: 1;
  color: ${(props: { isRed: boolean }) =>
    props.isRed ? "#ff0000" : "#49dbff"};
  font-weight: bold;
  font-size: 32px;
  text-align: right;
`;

const CountdownChargeContainer = styled(View)`
  flex: 1;
`;

export const Countdown = ({
  endDate,
  startCharge,
  startDate,
  maxFlightTimeMin,
}: Props) => {
  var diff: number = 0;
  const timeRemaining = () => {
    diff = getTimeRemaining(endDate);

    return convertMillisecondsToMinSec(diff);
  };
  const chargeRemaining = () =>
    getRentCharge(startCharge, startDate, maxFlightTimeMin);

  const [{ time, charge }, setData] = useState({
    time: timeRemaining(),
    charge: chargeRemaining(),
  });

  const tick = () =>
    setData({ time: timeRemaining(), charge: chargeRemaining() });

  useEffect(() => {
    const timerId = setTimeout(() => tick(), 1000);
    return () => clearTimeout(timerId);
  });

  return (
    <CountdownContainer>
      <CountdownTitle isRed={diff < 60000}>{time}</CountdownTitle>
      <Spacer width={16} />
      <CountdownChargeContainer>
        <Charge
          charge={charge}
          radius={18}
          bgColor="#3f3f3f"
          fontColor="#ffffff"
          fontSize={"18px"}
        />
      </CountdownChargeContainer>
    </CountdownContainer>
  );
};
