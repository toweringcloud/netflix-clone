import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Loader from "../components/Loader";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 50vh;
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

const Slider = styled.div`
	position: relative;
	top: -100px;
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

// visible movie count per page
const offset = 6;

function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>({
		queryKey: ["movies", "nowPlaying"],
		queryFn: getMovies,
	});

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgphoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(
										offset * index,
										offset * index + offset
									)
									.map((movie) => (
										<Box
											key={movie.id}
											bgphoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
											whileHover="hover"
											initial="normal"
											variants={boxVariants}
											transition={{ type: "tween" }}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}
export default Home;
