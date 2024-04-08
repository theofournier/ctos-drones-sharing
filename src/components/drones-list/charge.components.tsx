import React from "react";
import { View, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import styled from "styled-components";
import { Spacer } from "../utility/spacer.component";

type Props = {
  charge: number;
  radius?: number;
  borderWidth?: number;
  bgColor?: string;
  fontColor?: string;
  fontSize?: string;
};

const ChargeContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type ChargePercentProps = {
  fontColor: string;
  fontSize: string;
};
const ChargePercentText = styled(Text)`
  font-size: ${(props: ChargePercentProps) => props.fontSize};
  color: ${(props: ChargePercentProps) => props.fontColor};
`;

export const Charge = ({
  charge,
  radius = 30,
  borderWidth = 8,
  bgColor = "#ffffff",
  fontColor = "#000000",
  fontSize = "16px",
}: Props) => {
  let color = "#ff0000";
  if (charge > 66) {
    color = "#15ff00";
  } else if (charge > 33) {
    color = "#ff8800";
  }
  return (
    <ChargeContainer>
      <ProgressCircle
        percent={charge}
        radius={radius}
        borderWidth={borderWidth}
        color={color}
        shadowColor="#000000"
        bgColor={bgColor}
      />
      <Spacer width={8} />
      <ChargePercentText fontColor={fontColor} fontSize={fontSize}>
        {Math.round(charge)}%
      </ChargePercentText>
    </ChargeContainer>
  );
};
