import React, { createContext, useState, useEffect } from "react";
import data from "../database";

export const PatientsContext = createContext();

function PatientsContextProvider({ children }) {
	const [dataPatients, setDataPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setDataPatients(data);
		}, 2000);
		setIsLoading(false);
	}, []);

	const context = {
		dataPatients,
		setDataPatients,
		isLoading,
		setIsLoading,
	};

	return (
		<PatientsContext.Provider value={context}>
			{children}
		</PatientsContext.Provider>
	);
}

export default PatientsContextProvider;
