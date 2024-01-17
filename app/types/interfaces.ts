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
