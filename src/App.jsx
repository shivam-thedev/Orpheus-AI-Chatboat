import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function App() {
  return (
    <div className="app flex  bg-[#021526] pr-3 py-3 h-screen">
      <Sidebar/>
      <Main/>
    </div>
  )
}
