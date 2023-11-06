import styled from "styled-components";

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

function Tv() {
	return (
		<Wrapper>
			<h1>TV Shows</h1>
		</Wrapper>
	);
}
export default Tv;
