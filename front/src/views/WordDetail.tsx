import React, {useState, useEffect} from "react";
import styled, { CSSProperties } from "styled-components";
import { connect } from "react-redux";
import { Flex, Box } from "reflexbox";
import WordSearch from "../components/WordSearch";
import Layout from "../layout/Layout";

import { Link, useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Item = styled.div`
border-top:1px solid #fff;
border-bottom:1px solid #fff;
padding:10px 0px;
width:100%;

a{
  text-decoration:none;
}
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
`

const Title  = styled.h1`
  font-size:20px;
  font-weight:600px
`;

const PartOfSpeech = styled.span`
  font-size:16px;
  font-style:italic;
`;

const Index = styled.span`
  font-size:16px;
`;

interface Definitions{
    definition:String;
    exemple?:String;
    synonyms?: String[]
    antonyms?: String[]
}

interface WordResearched{
    partOfSpeech:String;
    definitions?:Definitions[];
}

const WordDetail = (props:any) => {
  
  const [isSearching, setIsSearching] = useState(false);
  const [suggest, setSuggest] = useState<string[]>([''])
  const [result, setResult] = useState<WordResearched | null>(null)
  const [loader, setLoader] = useState<Boolean>(true)


  const word:String = props.match.params.wordId

    useEffect(() => {
  
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/fr/${word}` )
        .then((response) => {
          if(response.status === 200){
                setResult(response.data[0].meanings[0]) 
                setLoader(false)
                console.log(result)
            }
        })
        .catch((err) => {
          setResult(null)
          setLoader(false)
        })
      }, [])

      const WordUppercase = word.charAt(0).toUpperCase() + word.slice(1);

  return (  
    <Layout
      search={
        <WordSearch
          onChange={(text) => setIsSearching(!!text)}
          setSuggest={setSuggest}
        />
      }
    >
     <Flex width={1} flexDirection="column" alignItems="start" justifyContent="center">
        {!isSearching && (<>
        {loader ? <Center><Loader/></Center>: 
        result ? (<>
            <Flex py={2}>
              <Title>{WordUppercase}</Title>
            </Flex>
            <Flex py={2}>
                <PartOfSpeech>{result.partOfSpeech}</PartOfSpeech>
            </Flex>
            {result?.definitions?.map((item, index) => {return(
            <Flex key={index} justifyContent="center" alignItems="start" flexDirection="column">
              <Flex justifyContent="center" alignItems="center">
                <Box px={2}>
                  <Index>{index + 1}.</Index>
                </Box>
                <Box py={4}>
                  <p style={{fontSize:"18px"}}>{item?.definition}</p>
                </Box>
              </Flex>
              {item?.exemple &&(
                <Flex>
                  <Box>Exemple</Box>
                  <Box>{item?.exemple}</Box>
                </Flex>
             )}
              {console.log(item?.synonyms?.length)}
              {item!.synonyms!.length < 0 && (
                <Flex py={2}>
                  <Box px={4}>Synonyms</Box>
                  {item?.synonyms?.map((item) => {<span>{item}</span>})}
                </Flex>
             )}
              {item!.antonyms!.length < 0  &&(
                <Flex py={2}>
                  <Box px={4}>Antonyms</Box>
                  {item!.antonyms!.map((item) => {<span>{item}</span>})}
                </Flex>
             )}
            </Flex>
            )})
          }

        </>):
        !result ? (<>
            <p>Désolé, le mot "{WordUppercase}" est introuvable</p>
        </>)
        :''
        
        }
        </>)}
        
        {isSearching && (<> 
          
         <Flex
             width="100%"
             justifyContent="center"
             alignItems="start"
             flexDirection="column"
         >
         {suggest.map((item) => {
            return (
            <Item key={item}>
                <Link to={`/word/${item.replace('def ', '')}`}  >{item.replace("def ", "")}</Link>
              </Item>
            )
          })}
         </Flex>
        </>)}
       
     </Flex>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(WordDetail);