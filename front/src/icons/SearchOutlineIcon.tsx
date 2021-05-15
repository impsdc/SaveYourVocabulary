import { SVGProps } from "react";
import React from "react";
import SVG from "./SVG";

const SearchOutlineIcon = (props: SVGProps<SVGElement>) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64zM338.29 338.29L448 448"
        fill="none"
      />
    </SVG>
  );
};

export default SearchOutlineIcon;
