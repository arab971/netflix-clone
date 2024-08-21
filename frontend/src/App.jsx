import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer.jsx"

function App() {

  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
   </Routes>
   <Footer/>
   <Toaster/>
    

   </>
  )
}

export default App
