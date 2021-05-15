import { SVGProps } from "react";
import React from "react";
import SVG from "./SVG";

const LogoutIcon = (props: SVGProps<SVGElement>) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
        fill="none"
      />
    </SVG>
  );
};

export default LogoutIcon;
