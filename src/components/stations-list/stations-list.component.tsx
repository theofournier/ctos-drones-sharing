import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

import { Station } from "../../services/models/station.model";
import { StationListItem } from "./station-list-item.component";

type Props = {
  stations: Station[];
  onPress: (arg0: Station) => void;
  selectedStationId?: string;
};

const StationSeparator = styled(View)`
  width: 8px;
`;

const StationList = styled(FlatList as new () => FlatList<Station>).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const StationsList = ({
  stations,
  onPress,
  selectedStationId,
}: Props) => {
  return (
    <View>
      <StationList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onPress(item)}>
              <StationListItem
                station={item}
                isSelected={selectedStationId === item.id}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <StationSeparator />}
      />
    </View>
  );
};
