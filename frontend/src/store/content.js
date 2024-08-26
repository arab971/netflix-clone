import {create} from "zustand";


const contentstore = create((set) => ({
    contentType: "movie",
    setContentType: (Type) => set({ contentType: Type }),
}))
export default contentstore