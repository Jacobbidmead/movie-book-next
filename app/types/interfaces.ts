export interface Movie {
  original_title: string;
  release_date: string;
  vote_average: string;
  id: string;
  poster_path: string;
  type: "movie";
}

export interface Show {
  original_name: string;
  release_date: string;
  vote_average: string;
  id: string;
  poster_path: string;
  type: "show";
}
