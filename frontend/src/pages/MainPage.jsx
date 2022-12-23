/* eslint-disable array-callback-return */
import { React, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import Patients from "../components/Patients";
import { PatientsContext } from "../context/PatientsContext";

function MainPage() {
	const [searchInput, setSearchInput] = useState("");
	const { dataPatients, setPatientsFiltered } = useContext(PatientsContext);

	function handleClickFilter() {
		const filteredPatients = dataPatients.filter(
			(patient) =>
				patient.CPF === searchInput ||
				patient.nome
					.toLowerCase()
					.includes(searchInput.toLowerCase()) ||
				patient.status.toLowerCase() === searchInput.toLowerCase()
		);
		console.log("FILTRO AQUI", filteredPatients);
		setPatientsFiltered(filteredPatients);
	}

	return (
		<>
			<NavBar />
			<section>
				<label htmlFor="searchInput">
					<input
						type="text"
						name="searchInput"
						id="searchInput"
						value={searchInput}
						onChange={(event) => {
							setSearchInput(event.target.value);
						}}
					/>
					<button onClick={handleClickFilter}>Pesquisar</button>
				</label>
				<button>Cadastrar Paciente</button>
			</section>
			<Patients />
		</>
	);
}

export default MainPage;
