import React from "react";
import "./loading.css";

function Loading() {
	return (
		<>
			<div data-testid="loading" className="loading"></div>
			<span>Carregando...</span>
		</>
	);
}

export default Loading;
