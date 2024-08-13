import styled from "styled-components/native";
import theme from "../../theme";

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 52px;
  justify-content: center;
  background-color: ${theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  color: ${theme.COLORS.BRAND_LIGHT};
  font-size: ${theme.FONT_SIZE.XXXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: center;
  margin-top: -280px;
  margin-bottom: 4px;
`;

export const Slogan = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-bottom: 32px;
`;
