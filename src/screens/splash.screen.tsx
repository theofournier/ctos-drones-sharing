import React from "react";
import styled from "styled-components";
import { StyleSheet, ImageBackground, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Spacer } from "../components/utility/spacer.component";

const splashImage = require("../assets/splash.png");

const SplashTitle = styled(Text)`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
`;

export const SplashScreen = () => {
  return (
    <ImageBackground
      style={styles.imageBackground}
      resizeMode="cover"
      source={splashImage}
      testID="splash_screen"
    >
      <SplashTitle>ctOS drone sharing</SplashTitle>
      <Spacer height={32} />
      <ActivityIndicator color="#ff0000" size={32} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignItems: "center",
    justifyContent: "center",
  },
});
