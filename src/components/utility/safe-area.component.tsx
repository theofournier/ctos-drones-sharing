import styled from "styled-components";
import { View, StatusBar } from "react-native";

export const SafeArea = styled(View)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
