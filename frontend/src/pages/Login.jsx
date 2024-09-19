import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../store/authUser.js"
const Login = () => {
  const {login,isLoggingIn} = useAuthStore()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const handleLogin = (e) => {
    e.preventDefault()
    login({email,password})
  }
  return (
    <>
    
    <div className="bg-img h-screen w-full">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to={"/"}>
            <img src="netflix-logo.png" alt="logo" className="w-52" />
          </Link>
        </header>
        <div className="flex justify-center items-center mt-20 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring
        "
                  placeholder="example@ex.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
           
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="number"
                  id="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring
        "
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <button className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" onClick={login}>
              {isLoggingIn ? "Loading..." : "Log In"}
              </button>
            </form>
            <div className="text-center text-gray-400">
             Don&apos;t have an account{" "}
              <Link to={"/signup"} className="text-red-700 hover:underline">
               Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    
    
    
    </>
  )
}

export default Login
