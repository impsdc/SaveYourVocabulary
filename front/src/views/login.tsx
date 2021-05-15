import React, {useState} from "react";
import {Flex, Box} from 'reflexbox';
import { PURPLE, DANGER, SECONDARY } from '../constants/style';
import { Button } from '../components/Button';
import LoginForm from "../components/forms/LoginForm"
import RegisterForm from '../components/forms/RegisterForm';
import styled from "styled-components"

const Main = styled(Flex)`
    height:100vh;
    display:grid;

    &:first-child{
        place-self:center;
    }
`

const Login = () => {
    const [toggle, setToggle] = useState(false)


    if(toggle) {
        return(
            <Main width={1} justifyContent="center">
                <Flex  flexDirection="column" justifyContent="center" alignItems="center">  
                    <Box>
                        <h1>Créer un compte</h1>    
                    </Box>   
                    <Flex>
                        <RegisterForm />
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center" alignItems="center">
                        <span>Or</span>
                        <Button 
                            content={"Se connecter"}
                            color={PURPLE}
                            target={false}
                            handleClick={()=> setToggle(!toggle)}
                        />
                    </Flex>
                </Flex>
            </Main>
        )
    }
    else{
      return(
        <Main width={1} justifyContent="center">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">  
                <Box>
                    <h1>Se connecter au PoloDico</h1>    
                </Box>   
                <Flex>
                    <LoginForm />
                </Flex>
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <span>Or</span>
                    <Button 
                        content={"S'inscrire"}
                        color={SECONDARY}
                        target={false}
                        handleClick={()=> setToggle(!toggle)}
                    />
                </Flex>
            </Flex>
    </Main>
      )
    }
   
}

export default Login