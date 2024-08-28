import styled from "styled-components/native";
import theme from "../../theme";

export const Container = styled.View`
  width: 100%;
  height: 150px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.GRAY_300};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const Input = styled.TextInput.attrs(() => {
  return {
    placeholderTextColor: theme.COLORS.GRAY_400,
    textAlignVertical: "top",
  };
})`
  flex: 1;
  font-size: ${theme.FONT_SIZE.MD}px;
  color: ${theme.COLORS.GRAY_200};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  margin-top: 16px;
`;
