import { styled } from "@mui/material/styles";

const CButton = styled("button", {
  shouldForwardProp: (prop) =>
    prop !== "width" &&
    prop !== "color" &&
    prop !== "disabled" &&
    prop !== "backgroundColor",
})<{
  width: string;
  color: string;
  disabled: boolean;
  backgroundColor: string;
}>(({ width, color, disabled, backgroundColor }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 16px",
  gap: "8px",

  width: width,
  height: "43px",

  /* gradient/pink/pink07 */

  background: disabled ? "#E9EBEC" : backgroundColor,
  borderRadius: "6px",

  /* Inside auto layout */

  flex: "none",
  order: "0",
  flexGrow: "1",
  color: color,
  margin: 0,
}));

interface Props {
  label: string;
  width: string;
  color: string;
  backgroundColor: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton = (props: Props) => {
  const { label, width, color, backgroundColor, type, disabled, onClick } =
    props;

  return (
    <>
      <CButton
        type={type === "submit" ? "submit" : "button"}
        onClick={onClick}
        width={width}
        color={color}
        backgroundColor={backgroundColor}
        disabled={disabled ? disabled : false}
      >
        {label}
      </CButton>
    </>
  );
};
export default CustomButton;
