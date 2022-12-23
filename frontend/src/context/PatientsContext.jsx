import React, { createContext, useState } from "react";

export const PatientsContext = createContext();

function PatientsContextProvider({ children }) {
	const [dataPatients, setDataPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
