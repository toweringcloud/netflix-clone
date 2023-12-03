import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/Loader";
import { searchContents, IGetMoviesResult, IGetTvShowsResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 110vh;
	background-color: black;
	color: "white";

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 100%;
	gap: 20px;
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	gap: 10px;
`;

const Title = styled.div`
	font-size: 25px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Contents = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(23.5vw, 1fr));
	grid-auto-rows: 22vh;
	gap: 5px;
`;

const NoData = styled.div`
	color: gray;
	font-size: 25px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div<{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 20px;
	cursor: pointer;
`;

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	if (!keyword) {
		return [null, null];
	}
	// console.log(keyword);

	const { isLoading: loadingMovies, data: dataMovies } =
		useQuery<IGetMoviesResult>({
			queryKey: ["movies", keyword],
			queryFn: () => searchContents("movie", keyword),
		});
	// console.log("dataMovies", dataMovies);

	const { isLoading: loadingTvShows, data: dataTvShows } =
		useQuery<IGetTvShowsResult>({
			queryKey: ["tvshows", keyword],
			queryFn: () => searchContents("tv", keyword),
		});
	// console.log("dataTvShows", dataTvShows);

	return (
		<Wrapper>
			{loadingMovies ? (
				<Loader />
			) : dataMovies && dataMovies.results.length > 0 ? (
				<Section>
					<Title>Movies</Title>
					<Contents>
						{dataMovies?.results.map((content) => (
							<Box
								bgphoto={makeImagePath(
									content.poster_path,
									"w300"
								)}
							>
								{content.title}
							</Box>
						))}
					</Contents>
				</Section>
			) : (
				<Section>
					<Title>Movies</Title>
					<NoData>No Contents Available</NoData>
				</Section>
			)}
			{loadingTvShows ? (
				<Loader />
			) : dataTvShows && dataTvShows.results.length > 0 ? (
				<Section>
					<Title>TV Shows</Title>
					<Contents>
						{dataTvShows?.results.map((content) => (
							<Box
								bgphoto={makeImagePath(
									content.poster_path,
									"w300"
								)}
							>
								{content.name}
							</Box>
						))}
					</Contents>
				</Section>
			) : (
				<Section>
					<Title>TV Shows</Title>
					<NoData>No Contents Available</NoData>
				</Section>
			)}
		</Wrapper>
	);
}
export default Search;
