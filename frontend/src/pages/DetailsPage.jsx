import { React, useState, useContext, useEffect } from "react";
import "../style/shared.css";
import { PatientsContext } from "../context/PatientsContext";
import { useLocation } from "react-router-dom";

import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	HStack,
	RadioGroup,
	Radio,
	Select,
	Button,
} from "@chakra-ui/react";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";

function DetailsPage() {
	const { dataPatients, isLoading, setDataPatients } =
		useContext(PatientsContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [adress, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [status, setStatus] = useState("Ativo");
	const [genre, setGenre] = useState("Masculino");
	const [patientDetailsById, setPatientDetailsById] = useState([]);
	const [isEdit, setIsEdit] = useState(false);

	const { pathname } = useLocation();
	const patientId = pathname.split("/")[2];
	// console.log("ID DA URL", patientId);

	useEffect(() => {
		const [patientById] = dataPatients.filter(
			(patient) => patient.id == patientId
		);

		if (patientById !== undefined) {
			setName(patientById.nome);
			setEmail(patientById.email);
			setCpf(patientById.cpf);
			setPhone(patientById.telefone);
			setBirthDate(patientById.dataDeNascimento);
			setAddress(patientById.endereço);
			setCity(patientById.cidade);
			setStatus(patientById.status);
			setGenre(patientById.genero);

			console.log("PACIENTE POR ID", patientById);
			setPatientDetailsById(patientById);
		} else {
			console.log("PACIENTE POR ID", patientById);
			setPatientDetailsById(patientById);
		}
	}, [dataPatients]);

	function handleEditPatient() {
		setIsEdit(true);
	}

	function handleUpdatePatient() {
		if (name === "" || email === "" || cpf === "" || phone === "") {
			alert("Preencha todos os campos!");
		} else {
			const [patientById] = dataPatients.filter(
				(patient) => patient.id == patientId
			);

			const index = dataPatients.indexOf(patientById);

			const newPatient = {
				id: patientById.id,
				nome: name,
				email: email,
				cpf: cpf,
				telefone: phone,
				dataDeNascimento: birthDate,
				endereço: adress,
				cidade: city,
				status: status,
				genero: genre,
			};

			const newDataPatients = [...dataPatients];
			newDataPatients[index] = newPatient;

			setDataPatients(newDataPatients);
			localStorage.setItem("patients", JSON.stringify(newDataPatients));
		}

		setIsEdit(false);

		Swal.fire({
			position: "center",
			icon: "success",
			title: "Paciente atualizado com sucesso!",
			showConfirmButton: false,
			timer: 1500,
		});
	}

	return (
		<>
			<h1 className="header">Detalhes do Paciente</h1>
			<NavBar />

			{isLoading ? (
				<Loading />
			) : (
				<Box className="box-form">
					<Flex className="form-container">
						<FormControl className="form">
							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="nome">Nome</FormLabel>
									<Input
										id="nome"
										onChange={(event) => {
											setName(event.target.value);
										}}
										value={name}
										disabled={isEdit ? false : true}
										isRequired={true}
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="email">
										E-mail
									</FormLabel>
									<Input
										isRequired={true}
										id="email"
										type="email"
										onChange={(event) => {
											setEmail(event.target.value);
										}}
										value={email}
										disabled={isEdit ? false : true}
									/>
								</Box>
							</HStack>

							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="nasc">
										Data de Nascimento
									</FormLabel>
									<Input
										id="nasc"
										type="text"
										onChange={(event) => {
											setBirthDate(event.target.value);
										}}
										value={birthDate}
										disabled={isEdit ? false : true}
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="cpf">CPF</FormLabel>
									<Input
										id="cpf"
										type="number"
										onChange={(event) => {
											setCpf(event.target.value);
										}}
										value={cpf}
										disabled={isEdit ? false : true}
									/>
								</Box>
							</HStack>

							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="endereco">
										Endereço
									</FormLabel>
									<Input
										id="endereco"
										onChange={(event) => {
											setAddress(event.target.value);
										}}
										value={adress}
										disabled={isEdit ? false : true}
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="cidade">
										Cidade
									</FormLabel>
									<Input
										id="cidade"
										onChange={(event) => {
											setCity(event.target.value);
										}}
										value={city}
										disabled={isEdit ? false : true}
									/>
								</Box>
							</HStack>

							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="cel">Celular</FormLabel>
									<Input
										id="cel"
										type="number"
										onChange={(event) => {
											setPhone(event.target.value);
										}}
										value={phone}
										disabled={isEdit ? false : true}
									/>
								</Box>
								<Box className="box-form">
									<FormLabel>Sexo</FormLabel>
									<RadioGroup
										onChange={setGenre}
										value={genre}
										disabled={isEdit ? false : true}
									>
										<HStack>
											<Radio value="Masculino">
												Masculino
											</Radio>
											<Radio value="Feminino">
												Feminino
											</Radio>
											<Radio value="Outro">Outro</Radio>
										</HStack>
									</RadioGroup>
								</Box>
							</HStack>

							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="status">
										Status
									</FormLabel>
									<Select
										variant="flushed"
										onChange={(event) => {
											setStatus(event.target.value);
										}}
										value={status}
										disabled={isEdit ? false : true}
									>
										<option value="Ativo">Ativo</option>
										<option value="Inativo">Inativo</option>
									</Select>
								</Box>
							</HStack>
							<HStack>
								<Button
									className="register-button"
									type="button"
									onClick={handleEditPatient}
									colorScheme="blue"
								>
									Editar
								</Button>

								<Button
									className="register-button"
									type="button"
									onClick={handleUpdatePatient}
									colorScheme="blue"
								>
									Salvar
								</Button>
							</HStack>
						</FormControl>
					</Flex>
				</Box>
			)}
		</>
	);
}

export default DetailsPage;
