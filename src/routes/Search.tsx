import styled from "styled-components";
// import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/Loader";
import { searchContents, IGetMoviesResult, IGetTvShowsResult } from "../api";
// import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 15vh;
	background-color: black;
	color: "white";

	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-auto-rows: 30vh;
`;

// const Box = styled.div<{ bgphoto: string }>`
// 	background-color: white;
// 	background-image: url(${(props) => props.bgphoto});
// 	background-size: cover;
// 	background-position: center center;
// 	height: 200px;
// 	font-size: 66px;
// `;

// const TEST_MODE = true;
// const ROOT_PATH = TEST_MODE ? "/netflix-clone/" : "/";
// const ROOT_PATH = process.env.SVC_DIV ? `/${process.env.SVC_DIV}/` : "/";

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	console.log(keyword);

	if (!keyword) {
		return [null, null];
	}
	const { isLoading: loadingMovies, data: dataMovies } =
		useQuery<IGetMoviesResult>({
			queryKey: ["movies", keyword],
			queryFn: () => searchContents("movie", keyword),
		});
	const { isLoading: loadingTvShows, data: dataTvShows } =
		useQuery<IGetTvShowsResult>({
			queryKey: ["tvshows", keyword],
			queryFn: () => searchContents("tv", keyword),
		});

	console.log("dataMovies", dataMovies);
	console.log("dataTvShows", dataTvShows);

	return (
		<Wrapper>
			{loadingMovies || loadingTvShows ? (
				<Loader />
			) : (
				<h1>
					Movie Search Result:\n{JSON.stringify(dataMovies?.results)}
				</h1>
				// {dataMovies && dataMovies?.results.map((content) => (
				//  	<Box bgphoto={makeImagePath(
				//  		content.backdrop_path,
				//  		"w500"
				//  	)}>{content.title}</Box>)
				// }
			)}
		</Wrapper>
	);
}
export default Search;
