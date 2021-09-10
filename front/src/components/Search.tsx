
import React, { useState } from "react";
import styled from "styled-components";
import {Flex, Box} from 'reflexbox'
import SearchIcon from '../icons/SearchIcon';

const SearchInput = styled.input`
  height: 80px;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1rem;
`;

interface Props {
  onChange: (text: string) => any;
  placeholder: string;
  pattern?: string;
  value?: string;
}

const Search = (props: Props) => {
  let timeout: NodeJS.Timeout;

  const [value, setValue] = useState(props.value);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValue(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      props.onChange(text);
    }, 300);
  };

  return (
    
    <Flex width={1} mx={2}>
      <SearchInput
          type="text"
          value={value || ""}
          pattern={props.pattern}
          placeholder={props.placeholder}
          onChange={onChange}
        />  
      <Box width={32} m={"auto"}>
          <SearchIcon stroke={"white"} fill={"white"} />
      </Box>
    </Flex> 
  );
};

export default Search;