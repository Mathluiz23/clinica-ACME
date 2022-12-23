import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/details/:id" element={<DetailsPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
