import React from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Drone } from "../../services/models/drone.model";
import { DroneListItem } from "./drone-list-item.component";
import { Spacer } from "../utility/spacer.component";

type Props = {
  drones: Drone[];
  onPress: (arg0: Drone) => void;
};

const DronesListContainer = styled(View)`
  flex: 1;
`;

const DroneSeparator = styled(View)`
  height: 4px;
`;

const DroneList = styled(FlatList as new () => FlatList<Drone>).attrs({
  contentContainerStyle: {
    paddingBottom: 8,
  },
})``;

const DroneEmptyContainer = styled(View)`
  flex: 1;
  padding: 32px;
  justify-content: center;
  align-items: center;
`;
const DroneEmptyText = styled(Text)`
  color: #ffffff;
  font-size: 28px;
  text-align: center;
`;

export const DronesList = ({ drones, onPress }: Props) => {
  if (drones.length === 0) {
    return (
      <DroneEmptyContainer>
        <MaterialCommunityIcons name="null" color="#ff3434" size={40} />
        <Spacer height={8} />
        <DroneEmptyText>No drones available</DroneEmptyText>
      </DroneEmptyContainer>
    );
  }
  return (
    <DronesListContainer>
      <DroneList
        data={drones.sort((a, b) => b.charge - a.charge)}
        keyExtractor={(item) => item.model}
        renderItem={({ item }) => {
          return <DroneListItem drone={item} onPress={() => onPress(item)} />;
        }}
        ItemSeparatorComponent={() => <DroneSeparator />}
      />
    </DronesListContainer>
  );
};
