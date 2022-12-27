import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import DetailsPage from "./pages/detailsPage/DetailsPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import "./App.css";

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
