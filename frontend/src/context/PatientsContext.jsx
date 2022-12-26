import React, { createContext, useState, useEffect } from "react";
import data from "../database";

export const PatientsContext = createContext();

function PatientsContextProvider({ children }) {
	const [dataPatients, setDataPatients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [patientsFiltered, setPatientsFiltered] = useState([]);
	// const [dataLocalStorage, setDataLocalStorage] = useState([]);

	useEffect(() => {
		const exists = localStorage.getItem("patients");
		if (exists) {
			setTimeout(() => {
				const dataLocalStorage = JSON.parse(exists);
				setDataPatients(dataLocalStorage);
				setIsLoading(false);
			}, 2000);
		} else {
			setTimeout(() => {
				setDataPatients(data);
				setIsLoading(false);
				localStorage.setItem("patients", JSON.stringify(data));
			}, 2000);
		}
	}, []);

	const context = {
		dataPatients,
		setDataPatients,
		isLoading,
		setIsLoading,
		patientsFiltered,
		setPatientsFiltered,
	};

	return (
		<PatientsContext.Provider value={context}>
			{children}
		</PatientsContext.Provider>
	);
}

export default PatientsContextProvider;
