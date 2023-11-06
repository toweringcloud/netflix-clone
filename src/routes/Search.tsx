import styled from "styled-components";

const Wrapper = styled.div`
	margin-top: 80px;
	background-color: tomato;
	color: "black";
	width: 100%;
	height: 100%;
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
