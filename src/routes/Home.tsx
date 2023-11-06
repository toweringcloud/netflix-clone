import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/Loader";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 15vh;
	background-color: black;
	color: "white";
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
`;
const Overview = styled.p`
	font-size: 30px;
	width: 50%;
`;

function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>({
		queryKey: ["movies", "nowPlaying"],
		queryFn: getMovies,
	});

	return (
		<Wrapper>
			{isLoading ? (
				<Loader />
			) : (
				<Banner
					bgPhoto={makeImagePath(
						data?.results[0].backdrop_path || ""
					)}
				>
					<Title>{data?.results[0].title}</Title>
					<Overview>{data?.results[0].overview}</Overview>
				</Banner>
			)}
		</Wrapper>
	);
}
export default Home;
