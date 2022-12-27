import { React, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import Patients from "../components/Patients";
import { PatientsContext } from "../context/PatientsContext";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, Box, Input, Flex } from "@chakra-ui/react";
import "../style/mainPage.css";
import "../style/shared.css";

function MainPage() {
	const [searchInput, setSearchInput] = useState("");
	const { dataPatients, setPatientsFiltered } = useContext(PatientsContext);
	const navigate = useNavigate();

	function handleClickFilter() {
		const filteredPatients = dataPatients.filter(
			(patient) =>
				patient.cpf === searchInput ||
				patient.nome
					.toLowerCase()
					.includes(searchInput.toLowerCase()) ||
				patient.status.toLowerCase() === searchInput.toLowerCase()
		);
		setPatientsFiltered(filteredPatients);
	}

	function registerPatient() {
		navigate("/register");
	}

	return (
		<>
			<div className="main-page-container">
				<header className="header">Clínica ACME</header>
				<NavBar />

				<Flex className="search-container">
					<Box className="box-form">
						<FormLabel htmlFor="searchInput">
							<Input
								type="text"
								name="searchInput"
								id="searchInput"
								placeholder="Pesquise o paciente por nome, CPF ou status"
								value={searchInput}
								onChange={(event) => {
									setSearchInput(event.target.value);
								}}
							/>
						</FormLabel>
					</Box>

					<Button
						className="search-button"
						type="button"
						colorScheme="rgb(18, 7, 88)"
						onClick={handleClickFilter}
					>
						Pesquisar Paciente
					</Button>
					<Button
						className="register-button"
						type="button"
						colorScheme="rgb(18, 7, 88)"
						onClick={registerPatient}
					>
						Cadastrar Paciente
					</Button>
				</Flex>
				<Patients />
			</div>
		</>
	);
}

export default MainPage;
