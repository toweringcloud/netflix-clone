import styled from "styled-components";

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: skyblue;
	color: "black";
	width: 100%;
	height: 100%;
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
