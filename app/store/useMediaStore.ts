// store/useMediaStore.ts
import { create } from "zustand";
import { MediaState } from "../types/interfaces";

const useMediaStore = create<MediaState>((set) => ({
  toggleMedia: "movies",
  handleToggleMedia: () =>
    set((state) => ({
      toggleMedia: state.toggleMedia === "movies" ? "shows" : "movies",
    })),
}));

export default useMediaStore;
