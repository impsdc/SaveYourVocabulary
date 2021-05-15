import React, {useState, useEffect} from "react";
import {Flex, Box} from "reflexbox";
import Button from "../Button";
import styled from "styled-components"
import { PURPLE, DANGER, VALIDE } from "../../constants/style";
import CheckIcon from '../../icons/CheckIcon';
import CrossIcon from '../../icons/CrossIcon';

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

const isEmail : RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const LoginForm = () => {
    
    const [user, setUser] = useState<User>({})
    const[isValidEmail, setIsValidEmail] = useState(<CrossIcon fill={DANGER}/>)
    const[isValidMdp, setIsValidMdp] = useState(<CrossIcon fill={DANGER}/>)
    const [confirmMdp, setConfirmMdp] = useState("")

    useEffect(() => {
        if(user.email){
            if(isEmail.test(String(user.email!.toLowerCase()))) {
                setIsValidEmail(<CheckIcon fill={VALIDE} />)
                
            }else{
                setIsValidEmail(<CrossIcon fill={DANGER} />)
            }
        }
    }, [user.email])

    useEffect(() => {
        if(user.mdp){
            if(user.mdp === confirmMdp) {
                setIsValidMdp(<CheckIcon fill={VALIDE} />)
            }else{
                setIsValidMdp(<CrossIcon fill={DANGER} />)
            }
        }
    }, [confirmMdp])



    const handleForm = () => {
        console.log("submit")
    }



    return (
        <Flex width={350} my={30} justifyContent="center" alignItems="center" flexDirection="column">
            <Box width={1}>
                <Flex width={1} justifyContent="center" alignItems="center">
                    <Input 
                        name="email"
                        value={user.email || ''}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        type="text"
                        className={"text-input-component"}
                        placeholder="Email"
                        required 
                    />
                    <Flex ml={10}>
                        {isValidEmail}
                    </Flex>
                </Flex>
                <Flex width={1} justifyContent="center" alignItems="center">
                    <Input
                        name="mdp"
                        value={user.mdp || ''}
                        onChange={(e) => setUser({...user, mdp: e.target.value})}
                        type="password"
                        className={"text-input-component"}
                        placeholder='Mot de passe'
                        required 
                    />
                    <Flex ml={10}>
                        {isValidMdp}
                    </Flex>
                </Flex>
                <Flex width={1} justifyContent="center" alignItems="center">
                    <Input
                        name="mdp"
                        value={confirmMdp || ''}
                        onChange={(e) => setConfirmMdp(e.target.value)}
                        type="password"
                        className={"text-input-component"}
                        placeholder='Confirme Mot de passe'
                        required 
                    />
                    <Flex ml={10}>
                        {isValidMdp}
                    </Flex>
                </Flex>
            </Box>
            <Button
                    handleClick={handleForm}
                    content={"Valider"}
                    color={PURPLE}
                />
        </Flex>
    )
}

export default LoginForm