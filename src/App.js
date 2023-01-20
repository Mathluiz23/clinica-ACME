import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import DetailsPage from "./pages/detailsPage/DetailsPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import "./style/App.css";
import LoginPage from "./pages/login/LoginPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<LoginPage />} />
				<Route exact path="/patient" element={<MainPage />} />
				<Route exact path="/details/:id" element={<DetailsPage />} />
				<Route exact path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
