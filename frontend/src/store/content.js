import {create} from "zustand";

export const contentstore = create((set) => ({
    contentType: "movie",
    setContentType: (Type) => set({ contentType: Type }),
}))