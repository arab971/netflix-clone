import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage.jsx"
import SearchPage from "./pages/SearchPage.jsx";
import SearchHistoryPage from "./components/SearchHistoryPage.jsx";
import NotFoundPage from "./components/404.jsx";

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();

 
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
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />

        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route path='/watch/:id' element={user ? <WatchPage/> : <Navigate to={"/login"} />} />
        <Route path='/search' element={user ? <SearchPage/> : <Navigate to={"/login"} />} />
        <Route path='/history' element={user ? <SearchHistoryPage/> : <Navigate to={"/login"} />} />
        <Route path='/*' element={<NotFoundPage/>} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
