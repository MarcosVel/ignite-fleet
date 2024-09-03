import styled from "styled-components/native";
import theme from "../../theme";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Label = styled.Text`
  color: ${theme.COLORS.GRAY_300};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const Description = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;
