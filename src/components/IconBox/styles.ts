import styled, { css } from "styled-components/native";
import theme from "../../theme";

export type SizeProps = "SMALL" | "NORMAL";

type Props = {
  size: SizeProps;
};

const variantSizeStyles = (size: SizeProps) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    NORMAL: css`
      width: 56px;
      height: 56px;
    `,
  }[size];
};

export const Container = styled.View<Props>`
  border-radius: 6px;
  background-color: ${theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
  z-index: 2;

  ${({ size }) => variantSizeStyles(size)}
`;
