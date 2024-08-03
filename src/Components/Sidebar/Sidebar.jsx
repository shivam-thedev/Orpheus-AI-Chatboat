import { useContext, useState } from "react"
import { Context } from "../../context/Context";
export default function Sidebar(){
    const [extended,setExtended]=useState(false);
    const {onSent,prevPrompt,setRecentPrompt,newChat}=useContext(Context);

    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
    return (
        <div className="sidebar  min-h-screen p-6 pt-4 inline-flex">
            <div className="top">
            <button className="fa-regular fa-bars text-3xl text-zinc-50  block ml-2" onClick={()=>setExtended(prev=>!prev)}/>
               <div onClick={()=>newChat()} className="new-chat  inline-flex gap-2.5 items-center py-1 px-3.5 mt-12 bg-sky-900 rounded-full cursor-pointer">
                   <button className="fa-regular fa-plus text-xl py-1" />
                   {extended? <p className="text-sm">New Chat</p>:null} 
               </div>
               {extended? <div className="recent animate-[fadeIn_1.5s]">
               <p className="mt-7 mb-5 text-sm mr-2.5">Recent</p>
               {prevPrompt.map((item,index)=>{
                return (
                    <div onClick={()=>loadPrompt(item)} className="recent-entry flex p-2 pr-10 items-center rounded-full hover:bg-sky-900 cursor-pointer" key={index}>
                      <button className="fa-regular fa-message-lines text-lg mx-2" />
                      <p className="text-sm">{item.slice(0,18)}...</p>
                    </div>
                )
               })}
               
               </div>:null}
            </div>
            <div className="bottom"></div>
        </div>
    )
}