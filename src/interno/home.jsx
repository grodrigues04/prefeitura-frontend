import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from '../components/main';
function Interno() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Main />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default Interno;
