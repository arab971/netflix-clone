import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const authUser = create((set) => ({
    user : null,
    isSignup : false,
    signup: async (creadentials) => {
     set  ({ isSignup : true})
       try {
        const res = await axios.post("/v1/auth/signup",creadentials);
       set({user:res.data.user,isSignup:false})
       toast.success("Account successfully created")
       } catch (error) {
        toast.error(error.data)
        set({user:"nothing find",isSignup:false})
       }
    },
Login: async () => {},
Logout: async () => {},
authUser: async () => {}
   
}))