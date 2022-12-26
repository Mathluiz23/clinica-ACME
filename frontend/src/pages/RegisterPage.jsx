import React, { useState, useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import Swal from "sweetalert2";
import "../style/registerPage.css";

import {
	Flex,
	Box,
	Center,
	FormControl,
	Input,
	FormLabel,
	HStack,
	RadioGroup,
	Radio,
	Button,
	Select,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

function RegisterPage() {
	const { setDataPatients, dataPatients } = useContext(PatientsContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [adress, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [status, setStatus] = useState("Ativo");
	const [genre, setGenre] = useState("Masculino");
	const [isValid, setIsValid] = useState(false);

	function validateForm(newPatient) {
		if (newPatient[0].nome !== "") {
			setIsValid(true);
		} else {
			setIsValid(false);
			console.log("NOME VAZIO");
		}

		if (newPatient[0].email !== "") {
			setIsValid(true);
		}

		if (
			newPatient[0].cpf !== "" ||
			newPatient[0].cpf.length === 11 ||
			newPatient[0].cpf !== dataPatients.map((patient) => patient.cpf)
		) {
			setIsValid(true);
		}

		if (newPatient[0].telefone !== "") {
			setIsValid(true);
		}

		if (newPatient[0].dataDeNascimento === "") {
			setIsValid(true);
		}

		if (newPatient[0].cidade === "") {
			setIsValid(true);
		}

		if (isValid) {
			const newData = [...dataPatients, ...newPatient];
			localStorage.setItem("patients", JSON.stringify(newData));
			setDataPatients(newData);
		}

		if (isValid) {
			Swal.fire({
				title: "Paciente Cadastrado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});

			setName("");
			setEmail("");
			setCpf("");
			setPhone("");
			setBirthDate("");
			setAddress("");
			setCity("");
		}
	}

	function handleSubmitForm() {
		const newPatient = [
			{
				id: dataPatients.length + 1,
				nome: name,
				email: email,
				cpf: cpf,
				telefone: phone,
				dataDeNascimento: birthDate,
				endereco: adress,
				cidade: city,
				status: status,
				genero: genre,
			},
		];

		validateForm(newPatient);
	}

	return (
		<>
			<Center className="header" as="header">
				Cadastro de Pacientes
			</Center>
			<NavBar />
			<Box className="box-form">
				<Flex className="form-container">
					<FormControl className="form">
						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nome">Nome</FormLabel>
								<Input
									id="nome"
									variant="filled"
									placeholder="Informe o nome completo"
									onChange={(event) => {
										setName(event.target.value);
									}}
									value={name}
								/>
								{name === " " ? (
									<p>{`* Por favor informe um nome`}</p>
								) : null}
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input
									id="email"
									variant="filled"
									type="email"
									placeholder="exemplo@interprocess.com"
									onChange={(event) => {
										setEmail(event.target.value);
									}}
									value={email}
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
									variant="filled"
									type="date"
									onChange={(event) => {
										setBirthDate(event.target.value);
									}}
									value={birthDate}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="cpf">CPF</FormLabel>
								<Input
									id="cpf"
									variant="filled"
									type="number"
									placeholder="000-000.000-00"
									onChange={(event) => {
										setCpf(event.target.value);
									}}
									value={cpf}
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
									variant="filled"
									placeholder="Rua Brasil 1"
									onChange={(event) => {
										setAddress(event.target.value);
									}}
									value={adress}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="cidade">Cidade</FormLabel>
								<Input
									id="cidade"
									variant="filled"
									placeholder="Porto Alegre"
									onChange={(event) => {
										setCity(event.target.value);
									}}
									value={city}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="cel">Celular</FormLabel>
								<Input
									id="cel"
									variant="filled"
									type="number"
									placeholder="(51) 99999-9999"
									onChange={(event) => {
										setPhone(event.target.value);
									}}
									value={phone}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel>Sexo</FormLabel>
								<RadioGroup onChange={setGenre} value={genre}>
									<HStack>
										<Radio value="Masculino">
											Masculino
										</Radio>
										<Radio value="Feminino">Feminino</Radio>
										<Radio value="Outro">Outro</Radio>
									</HStack>
								</RadioGroup>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="status">Status</FormLabel>
								<Select
									variant="flushed"
									onChange={(event) => {
										setStatus(event.target.value);
									}}
									value={status}
								>
									<option value="Ativo">Ativo</option>
									<option value="Inativo">Inativo</option>
								</Select>
							</Box>
						</HStack>

						<HStack>
							<Button
								className="submit-button"
								type="button"
								colorScheme="rgb(18, 7, 88)"
								isDisabled={
									name &&
									email &&
									birthDate &&
									cpf &&
									adress &&
									city &&
									phone &&
									genre &&
									status
										? false
										: true
								}
								onClick={handleSubmitForm}
							>
								Enviar
							</Button>
						</HStack>
					</FormControl>
				</Flex>
			</Box>
		</>
	);
}

export default RegisterPage;
