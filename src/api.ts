const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

interface IGenre {
	id: number;
	name: string;
}

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

//-category: now_playing, upcoming, popular, top_rated, latest
export function getMovies(category: string) {
	return fetch(`${API_URL}/movie/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export interface IMovieDetail {
	id: number;
	backdrop_path: string;
	genres: Array<IGenre>;
	homepage: string;
	overview: string;
	poster_path: string;
	release_date: string;
	runtime: number;
	status: string;
	tagline: string;
	title: string;
	vote_average: number;
}

// https://developer.themoviedb.org/reference/movie-details
export function getMovieInfo(id: number): Promise<IMovieDetail> {
	return fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`).then((response) =>
		response.json()
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

//-category: airing_today, on_the_air, popular, top_rated, latest
export function getTvShows(category: string) {
	return fetch(`${API_URL}/tv/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export interface ITvShowDetail {
	id: number;
	backdrop_path: string;
	first_air_date: string;
	genres: Array<IGenre>;
	homepage: string;
	name: string;
	overview: string;
	poster_path: string;
	seasons: Array<object>;
	status: string;
	tagline: string;
	vote_average: number;
}

// https://developer.themoviedb.org/reference/tv-series-details
export function getTvShowInfo(id: number): Promise<ITvShowDetail> {
	return fetch(`${API_URL}/tv/${id}?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

//-division: movie, tv
export function searchContents(division: string, keyword: string) {
	return fetch(
		`${API_URL}/search/${division}?api_key=${API_KEY}&query=${keyword}`
	).then((response) => response.json());
}
