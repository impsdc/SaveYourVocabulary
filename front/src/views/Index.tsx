import React, {useState, useEffect} from "react";
import styled, { CSSProperties } from "styled-components";
import { connect } from "react-redux";
import { Flex, Box } from "reflexbox";
import WordSearch from "../components/WordSearch";
import Layout from "../layout/Layout";
import { Link, useLocation, withRouter } from "react-router-dom";

const Item = styled.div`
border-top:1px solid #fff;
border-bottom:1px solid #fff;
padding:10px 0px;
width:100%;

a{
  text-decoration:none;
}
`;

const Index:React.FC = () => {

  const [isSearching, setIsSearching] = useState(false);
  const [suggest, setSuggest] = useState<string[]>([''])


  return (  
    <Layout
      search={
        <WordSearch
          onChange={(text) => setIsSearching(!!text)}
          setSuggest={setSuggest}
        />
      }
    >
     <Flex width="100%">
        {!isSearching && <p>Indexx</p>}
        
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

export default connect(mapStateToProps)(Index);