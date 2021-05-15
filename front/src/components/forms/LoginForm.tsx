import React, {useState, useEffect} from "react";
import {Flex, Box} from "reflexbox";
import Button from "../Button";
import styled from "styled-components"
import { PURPLE } from "../../constants/style";
import Loader from '../Loader';
import { useHistory } from "react-router-dom";

import { connect } from 'react-redux';
import { loginUser } from '../../_redux/actions/userActions';

const Input = styled.input`
    background: #dfe6e9;
    border:none;
    resize: none;
    width: 100%;
    outline: none;
    padding: 15px 10px;
    border-radius: 6px;
    margin: 10px 0;
`

interface User {
    email?:string,
    mdp?:string
}

const LoginForm = (props:any) => {
    let history = useHistory()
    
    const [userData, setUserData] = useState<User>({})
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)

    const handleForm = () => {
        setLoader(true)
        const data = {email:userData.email, password:userData.mdp}
        props.loginUser(data, history)
    }   

    if(loader){
        <Flex width={1} justifyContent="center" alignItems="center">
            <Loader />
        </Flex>
    }
    return (
        <Flex width={1} my={30} justifyContent="center" alignItems="center" flexDirection="column" style={{minHeight:"300px"}}>
            {loader ? 
                <Loader />
            :
            <>
            <form>
                <Box width={1}>
                    <Input 
                        name="email"
                        value={userData.email || ''}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        type="text"
                        className={"text-input-component"}
                        placeholder="Email"
                        autoComplete='on'
                        required 
                        />
                    <Input
                        name="mdp"
                        value={userData.mdp || ''}
                        onChange={(e) => setUserData({...userData, mdp: e.target.value})}
                        type="password"
                        className={"text-input-component"}
                        placeholder='Mot de passe'
                        autoComplete='on'
                        required 
                    />
                </Box>
            </form> 
            <Button
                handleClick={handleForm}
                content={"Valider"}
                color={PURPLE}
                />
            </>
            }
           
        </Flex>
    )
}

//this map the states to our props in this functional component
const mapStateToProps = (state: any) => ({
    user: state.user,
    UI: state.UI
});
   //this map actions to our props in this functional component
   const mapActionsToProps = {
    loginUser
   };
export default connect(mapStateToProps, mapActionsToProps)(LoginForm)