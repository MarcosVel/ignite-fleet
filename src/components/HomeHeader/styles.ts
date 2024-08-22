import { Image } from "expo-image";
import styled from "styled-components/native";
import theme from "../../theme";
import { Platform } from "react-native";

export const SafeArea = styled.SafeAreaView`
  background-color: ${theme.COLORS.GRAY_700};
`;

export const Container = styled.View`
  width: 100%;
  padding: 0 32px 32px;
  /* padding-top: ${Platform.OS === "android" ? 48 : 16}px; */
  flex-direction: row;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_700};
`;

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Message = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const Name = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.LG}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 6px;
`;
