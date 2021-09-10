import Search from "./Search";
import jsonp from "jsonp";
import { SetStateAction, Dispatch } from "react";

interface IProps {
    onChange?:(text: string) => any;
    setSuggest?: Dispatch<SetStateAction<string[]>>;
}

const WordSearch = (props:IProps) => {

    let suggest:string[] = []  
    const onSearch = (query:string) => {
        props.onChange?.(query);
        jsonp(`https://suggestqueries.google.com/complete/search?client=firefox&q=def ${query}`, {}, (err, data) => {  
            props.setSuggest?.(data[1])
        })
    }
    
    return (
        <Search onChange={onSearch} placeholder={'Dichotomie'}/>
    )
}

export default WordSearch;


