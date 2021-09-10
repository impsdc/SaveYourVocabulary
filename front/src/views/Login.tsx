import React, { useState, useEffect } from "react";
import { Flex, Box } from "reflexbox";
import { PURPLE, SECONDARY } from "../constants/style";
import { Button } from "../components/Button";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import styled from "styled-components";
import SEO from "../components/Helmet";
import { CheckAuthentication } from '../_helpers/CheckAuthentication';

const Main = styled(Flex)`
  height: 100vh;
  display: grid;

  &:first-child {
    place-self: center;
  }
`;

const Login: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  if (toggle) {
    return (
      <div>
        <SEO
          title="SaveYourVocabulary by Paul Santamaria"
          description="Register to SaveYourVocabulary"
        />
        <Main width={1} justifyContent="center">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <h1>Créer un compte</h1>
            </Box>
            <Flex>
              <RegisterForm />
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <span>Or</span>
              <Button
                content={"Se connecter"}
                color={PURPLE}
                target={false}
                handleClick={() => setToggle(!toggle)}
              />
            </Flex>
          </Flex>
        </Main>
      </div>
    );
  } else {
    return (
      <div>
        <SEO
          title="SaveYourVocabulary by Paul Santamaria"
          description="Login to SaveYourVocabulary"
        />
        <Main width={1} justifyContent="center">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <h1>Se connecter a SaveYourVocabulary</h1>
            </Box>
            <Flex>
              <LoginForm />
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <span>Or</span>
              <Button
                content={"S'inscrire"}
                color={SECONDARY}
                target={false}
                handleClick={() => setToggle(!toggle)}
              />
            </Flex>
          </Flex>
        </Main>
      </div>
    );
  }
};

export default Login;
