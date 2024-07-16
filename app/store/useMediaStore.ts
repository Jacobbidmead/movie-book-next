// store/useMediaStore.ts
import { create } from "zustand";
import { MediaState } from "../types/interfaces";

const useMediaStore = create<MediaState>((set) => ({
  toggleMedia: "movies",
  handleToggleMedia: () =>
    set((state) => ({
      toggleMedia: state.toggleMedia === "movies" ? "shows" : "movies",
    })),
  showUserMedia: false,
  showMedia: () =>
    set((state) => ({
      showUserMedia: !state.showUserMedia,
    })),
  showUserRecs: false,
  showRecs: () =>
    set((state) => ({
      showUserRecs: !state.showUserRecs,
    })),
}));

export default useMediaStore;
