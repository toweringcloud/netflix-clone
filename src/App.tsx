import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";

import ProtectedRoute from "./components/protected-route";
import Layout from "./components/Layout";

import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

const Wrapper = styled.div`
	width: 98vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ROOT_PATH = process.env.SVC_DIV ? `/${process.env.SVC_DIV}/` : "/";

const router = createBrowserRouter([
	{
		path: ROOT_PATH,
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "movies/:contentId",
				element: <Home />,
			},
			{
				path: "tv",
				element: <Tv />,
			},
			{
				path: "tvshows/:contentId",
				element: <Tv />,
			},
			{
				path: "search",
				element: <Search />,
			},
		],
	},
]);

function App() {
	return (
		<Wrapper>
			<RouterProvider router={router} />
		</Wrapper>
	);
}
export default App;
