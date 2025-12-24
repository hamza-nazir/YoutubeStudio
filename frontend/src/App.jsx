import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard'
import AudioLibrary from "./pages/AudioLibrary";
import Earn from "./pages/Earn";
import Content from "./pages/Content";
import Customise from "./pages/Customise";
import EditVideo from "./pages/EditVideo";
import Community from "./pages/Community";
import Watch from './pages/Watch'
import Result from "./pages/Result";
import Subtitles from "./pages/Subtitles";
const App = () => {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
   
        <Route path="/studio/dashboard" element={<Dashboard/>}/>
        <Route path="/studio/earn" element={<Earn/>}/>
        <Route path="/studio/content" element={<Content/>}/>
        <Route path="/studio/customise" element={<Customise/>}/>
        <Route path="/studio/audio" element={<AudioLibrary/>}/>
        <Route path="/studio/community" element={<Community/>}/>
        <Route path="/studio/subtitles" element={<Subtitles/>}/>
           <Route path={`/result`} element={<Result/>}/>
           <Route path={`/watch/:videoLink`} element={<Watch/>}/>

        <Route path={`/studio/:videolink/edit`} element={<EditVideo/>}/>





        

      </Routes>
    </div>
  )
}

export default App