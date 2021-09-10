import { createGlobalStyle} from "styled-components"

export const PURPLE = "#6c5ce7";
export const SECONDARY = "rgba(108, 92, 231, 0.8)";
export const DANGER = "rgb(231,15,80)";
export const VALIDE = "#2fc967";

export const LightTheme = {
  body: "#dfe6e9",
  text: "#1B1C21",
};

export const DarkTheme = {
  body: "#1B1C21",
  text: "#fff",
};

type ThemeType = typeof LightTheme

export const GlobalStyles = createGlobalStyle<{theme: ThemeType}>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Metropolis, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  input{
    color:${({ theme }) => theme.text};
  }
  `