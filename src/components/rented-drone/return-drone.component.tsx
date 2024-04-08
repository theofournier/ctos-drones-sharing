import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../utility/spacer.component";

type Props = {
  disabled: boolean;
  onPress: () => void;
};

const ReturnDroneContainer = styled(View)`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ReturnDroneText = styled(Text)`
  color: #49dbff;
  font-size: 24px;
  font-weight: bold;
`;
const ReturnDroneFullText = styled(Text)`
  color: #ff3434;
  font-size: 24px;
  font-weight: bold;
`;

export const ReturnDrone = ({ disabled, onPress }: Props) => {
  let children = (
    <>
      <Ionicons name="exit-outline" size={28} color="#49dbff" />
      <Spacer width={8} />
      <ReturnDroneText>Return here</ReturnDroneText>
    </>
  );

  if (disabled) {
    children = (
      <>
        <Ionicons name="close" size={28} color="#ff3434" />
        <Spacer width={8} />
        <ReturnDroneFullText>No free slots</ReturnDroneFullText>
      </>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <ReturnDroneContainer>{children}</ReturnDroneContainer>
    </TouchableOpacity>
  );
};
