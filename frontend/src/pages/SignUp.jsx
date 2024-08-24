import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser.js";
const SignUp = () => {
  const { searchParams } = new URL(document.location);
  const emailvalue = searchParams.get("email");
  const [email, setemail] = useState(emailvalue || "");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { signup,isSigningUp } = useAuthStore()

  const handleSignup = async (e) => {
    e.preventDefault();
   
		await signup({ email, password,username });
  };
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
              Sign Up
            </h1>
            <form className="space-y-4" onSubmit={handleSignup}>
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
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring
        "
                  placeholder="Enter name "
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
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
              <button
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Loading..." : "Sign Up"}
                {/* Sign Up */}
              </button>
            </form>
            <div className="text-center text-gray-400">
              Already have an account{" "}
              <Link to={"/login"} className="text-red-700 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
