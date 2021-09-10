import { CSSProperties } from "styled-components";
import { PURPLE } from "../constants/style";

const backStyle: CSSProperties = {
  width: "80px",
  height: "45px",
  paddingLeft: "4px",
  borderRadius: "45px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.2s",
};

const dotStyle: CSSProperties = {
  background: "white",
  width: "35px",
  height: "35px",
  borderRadius: "35px",
  transition: "all 0.2s",
};

const activeBack = `linear-gradient(156deg, ${PURPLE} 0%, ${PURPLE} 100%)`;

interface Props {
  active: boolean;
  onChange?:any;
}

export const Switcher = (props: Props) => {

  return (
    <div
      onClick={props.onChange}
      style={{
        ...backStyle,
        background: props.active ? activeBack : "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          ...dotStyle,
          marginLeft: props.active ? "37px" : "0",
        }}
      ></div>
    </div>
  );
};

export default Switcher;
