export interface Movie {
  title: string;
  release_date: string;
  vote_average: string;
  id: string;
  poster_path: string;
  type: "movie";
}

export interface Show {
  original_name: string;
  title: string;
  release_date: string;
  vote_average: string;
  id: string;
  poster_path: string;
  type: "show";
}

export interface LoginRequestBody {
  username: string;
  password: string;
}
export type MediaView = "movies" | "shows";

export interface MediaState {
  toggleMedia: MediaView;
  showUserMedia: boolean;
  handleToggleMedia: () => void;
  showMedia: () => void;
  showUserRecs: boolean;
  showRecs: () => void;
}
