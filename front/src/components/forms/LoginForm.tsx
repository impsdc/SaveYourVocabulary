import React, { useState, useEffect } from "react";
import { Flex, Box } from "reflexbox";
import Button from "../Button";
import styled from "styled-components";
import { DANGER, PURPLE } from "../../constants/style";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";

import { connect, useSelector } from "react-redux";
import { LoginUser } from "../../_redux/actions/UserActions";
import { SetError, ClearError } from "../../_redux/actions/UiActions";

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

const LoginForm = (props: any) => {
  let history = useHistory();

  const [userData, setUserData] = useState<User>({ email: "", mdp: "" });
  const [loader, setLoader] = useState(false);
  const error = useSelector<IProps, any>((state) => state.UI?.errors);

  useEffect(() => {
    setLoader(false);
  }, [error.status]);

  const handleForm = () => {
    setLoader(true);
    props.ClearError();
    if (userData.mdp === "" || userData.email === "") {
      props.SetError("Les champs ne peuvent pas être vide");
      setLoader(false);
    } else {
      const data = { email: userData.email, password: userData.mdp };
      props.LoginUser(data, history);
    }
  };

  return (
    <Flex
      width={1}
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
          <form style={{ textAlign: "center" }}>
            {error.status ? <Wrong>{error.message}</Wrong> : ""}
            <Box width={1}>
              <Input
                name="email"
                value={userData.email || ""}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="email"
                className={"text-input-component"}
                placeholder="Email"
                autoComplete="on"
                required
              />
              <Input
                name="mdp"
                value={userData.mdp || ""}
                onChange={(e) =>
                  setUserData({ ...userData, mdp: e.target.value })
                }
                type="password"
                className={"text-input-component"}
                placeholder="Mot de passe"
                autoComplete="on"
                required
              />
            </Box>
          </form>
          <Button handleClick={handleForm} content={"Valider"} color={PURPLE} />
        </>
      )}
    </Flex>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  LoginUser,
  SetError,
  ClearError,
};
export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
