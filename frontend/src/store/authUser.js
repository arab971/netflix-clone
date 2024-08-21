// import { create } from "zustand";
// import axios from "axios";
// import toast from "react-hot-toast";
// export const authUser = create((set) => ({
//   user: null,
//   isSignup: false,
//   signup: async (creadentials) => {
//     set({ isSignup: true });
//     try {
//       const res = await axios.post('/api/v1/auth/signup', creadentials);
//       set({ user: res.data.user, isSignup: false });
//       toast.success("Account successfully created");
//     } catch (error) {
//       toast.error(error.data);
//       set({ user: "nothing find", isSignup: false });
//     }
//   },
//   Login: async () => {},
//   Logout: async () => {},
//   authUser: async () => {},
// }));
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	// isCheckingAuth: true,
	// isLoggingOut: false,
	// isLoggingIn: false,
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	login: async () => {
		
	},
	logout: async () => {
		
	},
	authCheck: async () => {
		
	},
}));