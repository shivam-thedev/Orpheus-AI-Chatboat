import { createContext, useState } from "react";
import run from "../config/orpheus";


export const Context=createContext();

const ContextProvider=(props)=>{

    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loader,setLoader]=useState(false);
    const [resultData,setResultData]=useState("");
    
    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat=()=>{
        setLoader(false);
        setShowResult(false);
    }

    const onSent=async (prompt)=>{
        setResultData("");
        setLoader(true);
        setShowResult(true);
        let response;
        if (prompt!==undefined) {
            response=await run(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompt((prev)=>[...prev,input])
            setRecentPrompt(input);
            response=await run(input);
        }

        let newResponse = response.replace(/## (.*?)(?=\n|$)/g, "<h2>$1</h2>");
        newResponse = newResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        newResponse = newResponse.replace(/\*/g, "<br>");

        let newResponseArray=newResponse.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        setLoader(false);
        setInput("");
    }

    const contextValue={
        input,setInput,
        recentPrompt,setRecentPrompt,
        prevPrompt,setPrevPrompt,
        showResult,setShowResult,
        loader,setLoader,
        resultData,setResultData,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;