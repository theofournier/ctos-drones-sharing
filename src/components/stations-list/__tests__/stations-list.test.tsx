import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Drone } from "../../../services/models/drone.model";
import { Station } from "../../../services/models/station.model";
import { StationsList } from "../stations-list.component";

const mockDrone: Drone = {
  manufacturer: "Parrot",
  model: "Anafi",
  maxFlightTime: 30,
  charge: 50,
};
const mockDrone2: Drone = {
  manufacturer: "Parrot",
  model: "Anafi",
  maxFlightTime: 30,
  charge: 50,
};

const mockStation: Station = {
  id: "kingcrossstation",
  name: "King's Cross Station",
  description:
    "King's Cross railway station is a now defunct passenger railway terminus in the London Borough of Camden, on the edge of Central London.",
  images: ["KingCrossStation.png", "KingCrossStation_Drone.png"],
  slotNumbers: 10,
  drones: [mockDrone],
};
const mockStation2: Station = {
  id: "kingcrossstation2",
  name: "King's Cross Station",
  description:
    "King's Cross railway station is a now defunct passenger railway terminus in the London Borough of Camden, on the edge of Central London.",
  images: ["KingCrossStation.png", "KingCrossStation_Drone.png"],
  slotNumbers: 10,
  drones: [mockDrone2],
};

const mockStations: Station[] = [mockStation, mockStation2];

describe("<StationList />", () => {
  const mockOnPress = jest.fn();
  const screen = () =>
    render(
      <StationsList
        stations={mockStations}
        onPress={mockOnPress}
        selectedStationId=""
      />
    );
  it("should display 2 item", () => {
    const { getAllByText } = screen();
    expect(getAllByText("King's Cross Station")).toHaveLength(2);
    expect(getAllByText("1 / 10")).toHaveLength(2);
  });
  it("should call onPress with station", () => {
    fireEvent.press(screen().getAllByText("King's Cross Station")[0]);

    expect(mockOnPress).toBeCalledWith(mockStation);
  });
});
