import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
export const authUserStore = create((set) => ({
  user: null,
  issignup: false,
  signup: async (credentials) => {
    set({ issigningup: true });
    try {
      const response = await axios.post(
       `http://localhost:3000/api/auth/signup`,
       credentials

      );
      set({ user: response.data.user});
      toast.success("Account created successfully",{issigningup:false});
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else if (error.request) {
        toast.error("Network error: No response from server");
      } else {
        toast.error(error.message || "Signup failed");
      }
      set({ isSigningUp: false, user: null });
    }
  },
  // login:async()=>{}
  // logout:async()=>{}
  // authcheck:async()=>{}
}));
