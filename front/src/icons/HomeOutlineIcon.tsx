import React from "react";
import { SVGProps } from "react";
import SVG from "./SVG";

const HomeOutlineIcon = (props: SVGProps<SVGElement>) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="32px"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        x={48}
        y={48}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="#fff"
      />
      <rect
        x={288}
        y={48}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="#fff"
      />
      <rect
        x={48}
        y={288}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="#fff"
      />
      <rect
        x={288}
        y={288}
        width={176}
        height={176}
        rx={20}
        ry={20}
        fill="#fff"
      />
    </SVG>
  );
};

export default HomeOutlineIcon;
