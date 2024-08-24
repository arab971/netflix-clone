import {   Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer.jsx"
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react"

function App() {
  const {user, authCheck,isCheckingAuth } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);
  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}
  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={!user ? <Login /> : <Navigate to={"/"} />}/>
    <Route path="/signup" element={!user ? <SignUp /> : <Navigate to={"/"} />}/>
   </Routes>
   <Footer/>
   <Toaster/>
    

   </>
  )
}

export default App
