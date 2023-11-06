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

function Search() {
	return (
		<Wrapper>
			<h1>Search</h1>
		</Wrapper>
	);
}
export default Search;
