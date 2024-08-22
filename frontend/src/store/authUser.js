import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const authUserStore = create((set) => ({
  user: null,
  issignup: false,
  signup: async (credentials) => {
    set({ issigningup: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        credentials
      );
      set({ user: response.data.user, issignup: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  // login:async()=>{}
  // logout:async()=>{}
  // authcheck:async()=>{}
}));
