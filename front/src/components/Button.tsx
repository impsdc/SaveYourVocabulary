import styled, { CSSProperties } from "styled-components";
import React from "react";

const ButtonStyle = styled.button`
  font-size: 1.2rem;
  border: none;
  background: none;
  color: white;
  width: 100%;
  user-select: none;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.99);
  }

  background: linear-gradient(
    156deg,
    ${(props) => props.color || "transparent"} 0%,
    ${(props) => props.color || "transparent"} 100%
  );
  padding: 0.7rem 1.4rem;
  margin: 8px 0;
  border-radius: 10px;
  box-shadow: 0px 5px 20px 0px ${(props) => props.color || "transparent"}33;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 25px 0px ${(props) => props.color || "#fff"}39;
    background: hsla(
      0,
      0%,
      100%,
      ${(props) => props.color || ".05"}
    ) !important;
  }

  &:active {
    transform: scale(0.99);
    box-shadow: 0px 5px 25px 0px ${(props) => props.color || "transparent"}29;
  }
`;

interface Props {
  color?: string;
  classname?: string;
  content?: string;
  link?: string;
  target?: Boolean;
  value?: any;
  handleClick?: () => void;
  style?: CSSProperties;
}

export const Button = (props: Props) => {
  return (
    <div>
      {!props.link ? (
        <ButtonStyle
          onClick={props.handleClick}
          value={props.value}
          color={props.color}
          className={props.classname}
          style={{
            ...(props.style || {}),
          }}
          type="submit"
        >
          {props.content!}
        </ButtonStyle>
      ) : (
        <a href={props.link} target={props.target ? "_blank" : ""}>
          <ButtonStyle
            onClick={props.handleClick}
            color={props.color}
            value={props.value}
            className={props.classname}
            style={{
              ...(props.style || {}),
            }}
          >
            {props.content!}
          </ButtonStyle>
        </a>
      )}
    </div>
  );
};

export default Button;

/* export const SimpleButton = styled.button`
  font-size: 1.2rem;
  border: none;
  background: none;
  color: white;
  width: 100%;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const Button = styled(SimpleButton)`
  background: ${PRIMARY_1};
  background: linear-gradient(156deg, ${PRIMARY_1} 0%, ${PRIMARY_2} 100%);
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  box-shadow: 0px 5px 20px 0px ${PRIMARY_2}33;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 25px 0px ${PRIMARY_2}39;
  }

  &:active {
    transform: scale(0.99);
    box-shadow: 0px 5px 25px 0px ${PRIMARY_2}29;
  }
`;

export const DangerButton = styled(SimpleButton)`
  background: ${DANGER};
  background: linear-gradient(156deg, ${DANGER} 0%, ${DANGER} 100%);
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  box-shadow: 0px 5px 20px 0px ${DANGER}33;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 25px 0px ${DANGER}39;
  }

  &:active {
    transform: scale(0.99);
    box-shadow: 0px 5px 25px 0px ${DANGER}29;
  }
`;

export const WarningButton = styled(SimpleButton)`
  background: ${WARNING}!important;
  background: linear-gradient(156deg, ${WARNING} 0%, ${WARNING} 100%);
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  box-shadow: 0px 5px 20px 0px ${WARNING}33;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 25px 0px ${WARNING}39;
  }

  &:active {
    transform: scale(0.99);
    box-shadow: 0px 5px 25px 0px ${WARNING}29;
  }
`;

export const TransparentButton = styled(SimpleButton)`
  background: rgba(255, 255, 255, 0.15);
  padding: 0.7rem 1.4rem;
  border-radius: 10px;
  border: 3px solid transparent;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.99);
  }
`; */
