import styled from "styled-components";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/Loader";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 100vh;
	background-color: black;
	color: "white";
`;
const Banner = styled.div<{ bgphoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
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

const Category = styled.span<{ top: number }>`
	position: relative;
	top: ${(props) => props.top + "px"};
	font-size: 36px;
	color: white;
`;
const Slider = styled.div<{ top: number }>`
	position: relative;
	top: ${(props) => props.top + "px"};
`;
const Row = styled(motion.div)`
	position: absolute;
	width: 100%;
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
`;
const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const Box = styled(motion.div)<{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 66px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;
const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const Info = styled(motion.div)`
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;
const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duaration: 0.1,
			type: "tween",
		},
	},
};

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;
const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;
const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;
const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -80px;
	color: ${(props) => props.theme.white.lighter};
`;

const routeMatched = (specificRoute: string) => {
	const location = useLocation();
	const params = location.pathname.split("/");
	if (specificRoute.indexOf("movies") === -1) return null;
	return params.length >= 3 ? { contentId: params[params.length - 1] } : null;
};

function Home() {
	//-categories: now_playing, upcoming, popular, top_rated
	const categories = {
		a: { key: "now_playing", val: "Now Playing" },
		b: { key: "upcoming", val: "Upcoming" },
		c: { key: "popular", val: "Popular" },
		d: { key: "top_rated", val: "Top Rated" },
	};
	const useMultiQuery = () => {
		const nowPlaying = useQuery<IGetMoviesResult>({
			queryKey: ["movies", categories.a.key],
			queryFn: () => getMovies(categories.a.key),
		});
		const upcoming = useQuery<IGetMoviesResult>({
			queryKey: ["movies", categories.b.key],
			queryFn: () => getMovies(categories.b.key),
		});
		const popular = useQuery<IGetMoviesResult>({
			queryKey: ["movies", categories.c.key],
			queryFn: () => getMovies(categories.c.key),
		});
		const topRated = useQuery<IGetMoviesResult>({
			queryKey: ["movies", categories.d.key],
			queryFn: () => getMovies(categories.d.key),
		});
		return [nowPlaying, upcoming, popular, topRated];
	};
	const [
		{ isLoading: loadingPlaying, data: dataPlaying },
		{ isLoading: loadingUpcoming, data: dataUpcoming },
		{ isLoading: loadingPopular, data: dataPopular },
		{ isLoading: loadingTop, data: dataTop },
	] = useMultiQuery();

	// console.log("dataPlaying", dataPlaying);
	// console.log("dataUpcoming", dataUpcoming);
	// console.log("dataPopular", dataPopular);
	// console.log("dataTop", dataTop);

	const offset = 6;

	// A: now_playing
	const [indexA, setIndexA] = useState(0);
	const [leavingA, setLeavingA] = useState(false);
	const increaseIndexA = () => {
		if (dataPlaying) {
			if (leavingA) return;
			toggleLeavingA();
			const totalMovies = dataPlaying.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndexA((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeavingA = () => setLeavingA((prev) => !prev);

	// B: upcoming
	const [indexB, setIndexB] = useState(0);
	const [leavingB, setLeavingB] = useState(false);
	const increaseIndexB = () => {
		if (dataUpcoming) {
			if (leavingB) return;
			toggleLeavingB();
			const totalMovies = dataUpcoming.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndexB((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeavingB = () => setLeavingB((prev) => !prev);

	// C: popular
	const [indexC, setIndexC] = useState(0);
	const [leavingC, setLeavingC] = useState(false);
	const increaseIndexC = () => {
		if (dataPopular) {
			if (leavingC) return;
			toggleLeavingC();
			const totalMovies = dataPopular.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndexC((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeavingC = () => setLeavingC((prev) => !prev);

	// D: top_rated
	const [indexD, setIndexD] = useState(0);
	const [leavingD, setLeavingD] = useState(false);
	const increaseIndexD = () => {
		if (dataTop) {
			if (leavingD) return;
			toggleLeavingD();
			const totalMovies = dataTop.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndexD((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeavingD = () => setLeavingD((prev) => !prev);

	const navigate = useNavigate();
	const { scrollY } = useScroll();
	const bigMovieMatch = routeMatched("/movies/:movieId");
	const overlayClick = () => navigate("/");
	const onBoxClicked = (contentId: number) => {
		navigate(`/movies/${contentId}`);
	};
	const clickedMovie =
		bigMovieMatch?.contentId &&
		(dataPlaying?.results.find(
			(movie) => movie.id === +bigMovieMatch.contentId
		) ||
			dataUpcoming?.results.find(
				(movie) => movie.id === +bigMovieMatch.contentId
			) ||
			dataPopular?.results.find(
				(movie) => movie.id === +bigMovieMatch.contentId
			) ||
			dataTop?.results.find(
				(movie) => movie.id === +bigMovieMatch.contentId
			));

	return (
		<Wrapper>
			{loadingPlaying ||
			loadingUpcoming ||
			loadingPopular ||
			loadingTop ? (
				<Loader />
			) : (
				<>
					<Banner
						bgphoto={makeImagePath(
							dataPlaying?.results[0].backdrop_path || ""
						)}
					>
						<Title>{dataPlaying?.results[0].title}</Title>
						<Overview>{dataPlaying?.results[0].overview}</Overview>
					</Banner>
					<Category top={-200} onClick={increaseIndexA}>
						{categories.a.val}
					</Category>
					<Slider top={-180}>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeavingA}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={indexA}
							>
								{dataPlaying?.results
									.slice(1)
									.slice(
										offset * indexA,
										offset * indexA + offset
									)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											variants={boxVariants}
											initial="normal"
											transition={{ type: "tween" }}
											whileHover="hover"
											onClick={() =>
												onBoxClicked(movie.id)
											}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<Category top={70} onClick={increaseIndexB}>
						{categories.b.val}
					</Category>
					<Slider top={90}>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeavingB}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={indexB + 100}
							>
								{dataUpcoming?.results
									.slice(1)
									.slice(
										offset * indexB,
										offset * indexB + offset
									)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											variants={boxVariants}
											initial="normal"
											transition={{ type: "tween" }}
											whileHover="hover"
											onClick={() =>
												onBoxClicked(movie.id)
											}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<Category top={340} onClick={increaseIndexC}>
						{categories.c.val}
					</Category>
					<Slider top={360}>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeavingC}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={indexC + 100}
							>
								{dataPopular?.results
									.slice(1)
									.slice(
										offset * indexC,
										offset * indexC + offset
									)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											variants={boxVariants}
											initial="normal"
											transition={{ type: "tween" }}
											whileHover="hover"
											onClick={() =>
												onBoxClicked(movie.id)
											}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<Category top={610} onClick={increaseIndexD}>
						{categories.d.val}
					</Category>
					<Slider top={630}>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeavingD}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={indexD + 100}
							>
								{dataTop?.results
									.slice(1)
									.slice(
										offset * indexD,
										offset * indexD + offset
									)
									.map((movie) => (
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											variants={boxVariants}
											initial="normal"
											transition={{ type: "tween" }}
											whileHover="hover"
											onClick={() =>
												onBoxClicked(movie.id)
											}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay
									onClick={overlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.contentId}
								>
									{clickedMovie && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedMovie.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<BigTitle>
												{clickedMovie.title}
											</BigTitle>
											<BigOverview>
												{clickedMovie.overview}
											</BigOverview>
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
export default Home;
