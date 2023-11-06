const API_KEY = "{your_credential}";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	first_air_date: string;
	popularity: number;
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

//-category: now_playing, upcoming, popular, top_rated
export function getMovies(category: string) {
	return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

interface ITvShow {
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
	first_air_date: string;
	popularity: number;
}

export interface IGetTvShowsResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: ITvShow[];
	total_pages: number;
	total_results: number;
}

//-category: airing_today, on_the_air, popular, top_rated
export function getTvShows(category: string) {
	return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

//-division: movie, tv
export function search(division: string, keyword: string) {
	return fetch(
		`${BASE_PATH}/search/${division}?api_key=${API_KEY}&query=${keyword}`
	).then((response) => response.json());
}
