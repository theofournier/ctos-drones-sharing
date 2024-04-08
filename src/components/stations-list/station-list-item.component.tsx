import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Station } from "../../services/models/station.model";
import { getImageSource } from "../../utils/getImageSource";
import { Spacer } from "../utility/spacer.component";

type Props = {
  station: Station;
  isSelected: boolean;
};

const StationCard = styled(Card).attrs({
  elevation: 10,
})`
  height: 250px;
  width: 200px;
  border-radius: 5px;
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#0093b8" : "#ffffffe3"};
`;

const StationImage = styled(Image)`
  height: 60%;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StationInfoContainer = styled(View)`
  flex: 1;
  padding: 8px;
  justify-content: space-between;
`;

const StationName = styled(Text)`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#ffffff" : "#000000"};
`;

const StationSlots = styled(Text)`
  font-size: 14px;
  text-align: center;
  color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? "#ffffff" : "#000000"};
`;

const StationDroneContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StationListItem = ({ station, isSelected }: Props) => {
  return (
    <StationCard isSelected={isSelected}>
      <StationImage source={getImageSource(station.images[0])} />
      <StationInfoContainer>
        <StationName isSelected={isSelected}>{station.name}</StationName>
        <Spacer height={4} />
        <StationDroneContainer>
          <StationSlots isSelected={isSelected}>
            {station.drones.length} / {station.slotNumbers}
          </StationSlots>
          <Spacer width={8} />
          <Ionicons
            name="airplane-outline"
            size={24}
            color={isSelected ? "#ffffff" : "#000000"}
          />
        </StationDroneContainer>
      </StationInfoContainer>
    </StationCard>
  );
};
