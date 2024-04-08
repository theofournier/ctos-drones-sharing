import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../utility/spacer.component";

const WelcomeContainer = styled(View)`
  flex: 1;
  padding: 24px;
  padding-top: 0px;
  align-items: center;
`;

const WelcomeTitle = styled(Text)`
  color: #49dbff;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const WelcomeText = styled(Text)`
  flex: 6;
  color: #ffffff;
  font-size: 18px;
`;

const WelcomeTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const WelcomeIconContainer = styled(View)`
  flex: 1;
`;

export const Welcome = () => (
  <ScrollView>
    <WelcomeContainer>
      <WelcomeTitle>Welcome on ctOS drone sharing</WelcomeTitle>
      <Spacer height={16} />
      <WelcomeTextContainer>
        <WelcomeIconContainer>
          <Ionicons name="business" size={28} color="#49dbff" />
        </WelcomeIconContainer>
        <WelcomeText>
          Select a station to display the available drones.
        </WelcomeText>
      </WelcomeTextContainer>
      <Spacer height={8} />
      <WelcomeTextContainer>
        <WelcomeIconContainer>
          <Ionicons name="lock-open" size={28} color="#49dbff" />
        </WelcomeIconContainer>
        <WelcomeText>Press on "Unlock drone" to start renting it.</WelcomeText>
      </WelcomeTextContainer>
      <Spacer height={8} />
      <WelcomeTextContainer>
        <WelcomeIconContainer>
          <Ionicons name="exit-outline" size={28} color="#49dbff" />
        </WelcomeIconContainer>
        <WelcomeText>
          Return the drone to any station with free slots.
        </WelcomeText>
      </WelcomeTextContainer>
      <Spacer height={8} />
      <WelcomeTextContainer>
        <WelcomeIconContainer>
          <Ionicons name="battery-dead" size={28} color="#49dbff" />
        </WelcomeIconContainer>
        <WelcomeText>
          Be careful that the battery does not fall to 0, otherwise you will
          lose the drone!
        </WelcomeText>
      </WelcomeTextContainer>
    </WelcomeContainer>
  </ScrollView>
);
