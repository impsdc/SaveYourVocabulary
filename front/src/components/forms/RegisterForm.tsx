import React, { useState, useEffect } from "react";
import { Flex, Box } from "reflexbox";
import Button from "../Button";
import styled from "styled-components";
import { PURPLE, DANGER, VALIDE } from "../../constants/style";
import CheckIcon from "../../icons/CheckIcon";
import CrossIcon from "../../icons/CrossIcon";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";

import { connect, useSelector } from "react-redux";
import { RegisterUser } from "../../_redux/actions/UserActions";
import { SetError, ClearError } from "../../_redux/actions/UiAction";

const Input = styled.input`
  background: #dfe6e9;
  border: none;
  resize: none;
  width: 100%;
  outline: none;
  padding: 15px 10px;
  border-radius: 6px;
  margin: 10px 0;
`;

const Wrong = styled.span`
  font-size: 1.2rem;
  color: ${DANGER};
`;

interface User {
  email?: string;
  mdp?: string;
  username?: string;
}

interface IProps {
  user?: {};
  UI?: {
    errors?: {
      status?: boolean;
      message?: string;
    };
  };
}

const isEmail: RegExp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const RegisterForm = (props: any) => {
  let history = useHistory();

  const [userData, setUser] = useState<User>({});
  const [isValidUsername, setIsValidUsername] = useState<Boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<Boolean>(false);
  const [isValidMdp, setIsValidMdp] = useState<Boolean>(false);
  const [confirmMdp, setConfirmMdp] = useState("");
  const [loader, setLoader] = useState(false);
  const error = useSelector<IProps, any>((state) => state.UI?.errors);

  useEffect(() => {
    setLoader(false);
  }, [error.status]);

  useEffect(() => {
    if (userData.username) {
      if (userData.username !== "") {
        setIsValidUsername(true);
      } else {
        setIsValidUsername(false);
      }
    }
  }, [userData.username]);

  useEffect(() => {
    if (userData.email) {
      if (isEmail.test(String(userData.email!.toLowerCase()))) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    }
  }, [userData.email]);

  useEffect(() => {
    if (userData.mdp) {
      if (userData.mdp === confirmMdp) {
        setIsValidMdp(true);
      } else {
        setIsValidMdp(false);
      }
    }
  }, [confirmMdp]);

  const handleForm = () => {
    setLoader(true);
    props.ClearError();
    if (!isValidUsername || !isValidEmail || !isValidMdp) {
      props.SetError("les champs sont vides ou ne respectent pas leur types");
      setLoader(false);
    } else {
      const data = {
        username: userData.username,
        email: userData.email,
        password: userData.mdp,
      };
      props.RegisterUser(data, history);
    }
  };

  return (
    <Flex
      width={350}
      my={30}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      style={{ minHeight: "300px" }}
    >
      {loader ? (
        <Loader />
      ) : (
        <>
          <form style={{ width: "100%", textAlign: "center" }}>
            <Box width={1}>
              {error.status ? <Wrong>{error.message}</Wrong> : ""}
              <Flex width={1} justifyContent="center" alignItems="center">
                <Input
                  name="username"
                  value={userData.username || ""}
                  onChange={(e) =>
                    setUser({ ...userData, username: e.target.value })
                  }
                  type="text"
                  placeholder="Username"
                  required
                />
                <Flex ml={10}>
                  {isValidUsername ? (
                    <CheckIcon fill={VALIDE} />
                  ) : (
                    <CrossIcon fill={DANGER} />
                  )}
                </Flex>
              </Flex>
              <Flex width={1} justifyContent="center" alignItems="center">
                <Input
                  name="email"
                  value={userData.email || ""}
                  onChange={(e) =>
                    setUser({ ...userData, email: e.target.value })
                  }
                  type="text"
                  placeholder="Email"
                  required
                />
                <Flex ml={10}>
                  {isValidEmail ? (
                    <CheckIcon fill={VALIDE} />
                  ) : (
                    <CrossIcon fill={DANGER} />
                  )}
                </Flex>
              </Flex>
              <Flex width={1} justifyContent="center" alignItems="center">
                <Input
                  name="mdp"
                  value={userData.mdp || ""}
                  onChange={(e) =>
                    setUser({ ...userData, mdp: e.target.value })
                  }
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="on"
                  required
                />
                <Flex ml={10}>
                  {isValidMdp ? (
                    <CheckIcon fill={VALIDE} />
                  ) : (
                    <CrossIcon fill={DANGER} />
                  )}
                </Flex>
              </Flex>
              <Flex width={1} justifyContent="center" alignItems="center">
                <Input
                  name="mdp"
                  value={confirmMdp || ""}
                  onChange={(e) => setConfirmMdp(e.target.value)}
                  type="password"
                  className={"text-input-component"}
                  placeholder="Confirme Mot de passe"
                  autoComplete="on"
                  required
                />
                <Flex ml={10}>
                  {isValidMdp ? (
                    <CheckIcon fill={VALIDE} />
                  ) : (
                    <CrossIcon fill={DANGER} />
                  )}
                </Flex>
              </Flex>
            </Box>
          </form>
          <Button handleClick={handleForm} content={"Valider"} color={PURPLE} />
        </>
      )}
    </Flex>
  );
};

//this map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});
//this map actions to our props in this functional component
const mapActionsToProps = {
  RegisterUser,
  SetError,
  ClearError,
};
export default connect(mapStateToProps, mapActionsToProps)(RegisterForm);
