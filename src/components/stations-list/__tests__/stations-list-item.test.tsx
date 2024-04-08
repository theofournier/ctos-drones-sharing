import React from "react";
import { render } from "@testing-library/react-native";
import { Drone } from "../../../services/models/drone.model";
import { Station } from "../../../services/models/station.model";
import { StationListItem } from "../station-list-item.component";

const mockDrone: Drone = {
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

describe("<StationListItem /> unselected", () => {
  it("should display text", () => {
    const screen = render(
      <StationListItem station={mockStation} isSelected={false} />
    );
    screen.getByText("King's Cross Station");
    screen.getByText("1 / 10");
  });
});
describe("<StationListItem /> selected", () => {
  it("should display text", () => {
    const screen = render(
      <StationListItem station={mockStation} isSelected={true} />
    );
    screen.getByText("King's Cross Station");
    screen.getByText("1 / 10");
  });
});
