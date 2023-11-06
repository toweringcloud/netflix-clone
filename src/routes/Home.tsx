import styled from "styled-components";

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: lightpink;
	color: "black";
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function Home() {
	return (
		<Wrapper>
			<h1>Movies</h1>
		</Wrapper>
	);
}
export default Home;
