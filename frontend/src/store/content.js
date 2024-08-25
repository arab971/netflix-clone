import {create} from "zustand";
// import { useAuthStore } from "./authUser.js";

const contentstore = create((set) => ({
    contentType: "movie",
    setContentType: (Type) => set({ contentType: Type }),
}))
export default contentstore