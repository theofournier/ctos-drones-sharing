import React from "react";
import { View } from "react-native";
import styled from "styled-components";

type Props = {
  height?: number;
  width?: number;
};

export const SpacerView = styled(View)`
  height: ${(props: Props) => props.height}px;
  width: ${(props: Props) => props.width}px;
`;

export const Spacer = ({ height = 0, width = 0 }: Props) => {
  return <SpacerView height={height} width={width} />;
};
