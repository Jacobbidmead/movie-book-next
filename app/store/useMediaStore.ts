import { create } from "zustand";
import { MediaState, MediaView, ScreenState } from "../types/interfaces";

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
  recommendations: [],
  setRecommendations: (recommendations) =>
    set(() => ({
      recommendations,
    })),
  screenState: "movies",
  setScreenState: (screenState: ScreenState) =>
    set(() => ({
      screenState,
    })),
}));

export default useMediaStore;
