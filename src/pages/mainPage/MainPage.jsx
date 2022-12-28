import { React, useState, useContext } from "react";
import SideBar from "../../components/sideBar/SideBar";
import Patients from "../../components/patientTable/PatientTable";
import { PatientsContext } from "../../context/PatientsContext";
import { useNavigate } from "react-router-dom";
import { Button, FormLabel, Box, Input, Flex, Center } from "@chakra-ui/react";
import "./mainPage.css";
import "../../style/shared.css";
import LogoTipo from "../../components/logoTipo/LogoTipo";

function MainPage() {
	const [searchInput, setSearchInput] = useState("");
	const { dataPatients, setPatientsFiltered } = useContext(PatientsContext);
	const navigate = useNavigate();

	function handleClickFilter() {
		const filteredPatients = dataPatients.filter(
			(patient) =>
				patient.cpf === searchInput ||
				patient.name
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
				<Center className="header">Clínica ACME</Center>
				<LogoTipo />

				<SideBar />

				<Flex className="search-container">
					<Box className="box-form">
						<FormLabel htmlFor="searchInput">
							<Input
								className="search-input"
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

					<Box className="container-button">
						<Button
							className="register-and-search-button"
							type="button"
							colorScheme="rgb(18, 7, 88)"
							onClick={handleClickFilter}
						>
							Pesquisar Paciente
						</Button>
						<Button
							id="btn-register"
							className="register-and-search-button"
							type="button"
							colorScheme="rgb(18, 7, 88)"
							onClick={registerPatient}
						>
							Cadastrar Paciente
						</Button>
					</Box>
				</Flex>
				<Patients />
			</div>
		</>
	);
}

export default MainPage;
