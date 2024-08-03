import './Main.css'
import logo from '../../assets/logo.png'
import image1 from '../../assets/travel.jpg'
import image2 from '../../assets/planning.jpg'
import image3 from '../../assets/react-native.jpg'
import { useContext } from 'react'
import { Context } from '../../context/Context'

export default function Main() {
  const {input,setInput,recentPrompt,setRecentPrompt,showResult,loader,resultData,onSent}=useContext(Context);
  const loadSugg = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const handleClick = (event) => {
    const paragraph = event.currentTarget.querySelector('p');
    const prompt = paragraph.innerText;
    loadSugg(prompt);
  };

  return (
    <div className="main flex-1 bg-[#053f713e] rounded-lg" >
        <div className="nav flex p-5 pt-2 px-3 justify-between">
          <div className="icon flex items-center">
             <p className="font-bold text-xl mx-1">Orpheus</p> 
             <img src={logo} className='w-10'/>
          </div>
           <button className="fa-regular fa-user text-base py-2.5 px-4 rounded-full bg-[#053f717b]"/>
        </div>
        <div className="main-container max-w-[900px] m-auto">
          {!showResult?
          <>
            <div className="greet my-9 text-slate-400 font-medium text-6xl p-5">
            <p className='text-cyan-50'>Hi there!</p>
            <p className='leading-snug text-cyan-400'>How can I assist you today?</p>
          </div>
          <div className="cards p-5 grid grid-cols-3 gap-2.5">
            <div className="box" onClick={handleClick}>
              <img src={image1}/>
              <p >Suggest beautiful places to see on an upcoming road trip</p>
              <i className="fa-regular fa-compass"></i>
            </div>
            <div className="box" onClick={handleClick}>
            <img src={image2}/>
              <p>Briefly summarize this concept: urban planning</p>
              <i className="fa-regular fa-lightbulb"></i>
            </div>
            <div className="box" onClick={handleClick}>
            <img src={image3}/>
              <p>Tell me about React js and React native</p>
              <i className="fa-solid fa-code"></i>
            </div>
          </div>
          </>
          :
          <div className="result py-[5%] max-h-[70vh] overflow-y-scroll">
            <div className="result-title flex  items-center gap-5 my-10">
               <button className="fa-regular fa-user text-lg py-2.5 px-4 rounded-full bg-[#053f717b]"/>
               <p className='text-lg text-cyan-100'>{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-5">
              <img src={logo} className='w-12'/>
              {loader 
              ?<div className="loader flex w-full flex-col gap-2.5">
                <hr />
                <hr />
                <hr />
              </div>
              :<p dangerouslySetInnerHTML={{__html:resultData}} className="leading-relaxed text-lg text-cyan-100"></p>
              }           
            </div>
          </div>
          }
          <div className="main-bottom absolute bottom-1 w-full max-w-[900px] m-auto px-5">
            <div className="search-box w-full flex justify-between items-center bg-[#053f7163] px-5 py-2.5 rounded-full">
              <input type="text" placeholder='Enter a prompt here' className='outline-none w-11/12 p-2 bg-transparent placeholder:text-lg text-cyan-50' value={input} onChange={(e)=>(setInput(e.target.value))}/>
              {input?<i className="fa-solid fa-paper-plane-top text-xl cursor-pointer" onClick={()=>onSent()}></i>:null}
            </div>
            <p className='my-4 text-center text-sm'>Orpheus may display inaccurate info, including about people, so double-check its responses.</p>
          </div>
        </div>

    </div>
  );
}