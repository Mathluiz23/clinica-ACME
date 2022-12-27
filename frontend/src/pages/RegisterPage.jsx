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
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [status, setStatus] = useState("Ativo");
	const [genre, setGenre] = useState("Masculino");
	const [isValid, setIsValid] = useState(false);

	function validateForm(newPatient) {
		if (newPatient[0].name !== "") {
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

		if (newPatient[0].phone !== "") {
			setIsValid(true);
		}

		if (newPatient[0].birthDate === "") {
			setIsValid(true);
		}

		if (newPatient[0].city === "") {
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
				name: name,
				email: email,
				cpf: cpf,
				phone: phone,
				birthDate: birthDate,
				address: address,
				city: city,
				status: status,
				genre: genre,
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
								<FormLabel htmlFor="name">Nome</FormLabel>
								<Input
									id="name"
									name="name"
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
									name="email"
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
								<FormLabel htmlFor="birthDate">
									Data de Nascimento
								</FormLabel>
								<Input
									id="birthDate"
									name="birthDate"
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
									name="cpf"
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
								<FormLabel htmlFor="address">
									Endereço
								</FormLabel>
								<Input
									id="address"
									name="address"
									variant="filled"
									placeholder="Rua Brasil 1"
									onChange={(event) => {
										setAddress(event.target.value);
									}}
									value={address}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="city">Cidade</FormLabel>
								<Input
									id="city"
									name="city"
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
								<FormLabel htmlFor="phone">Celular</FormLabel>
								<Input
									id="phone"
									name="phone"
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
								<RadioGroup
									name="genre"
									onChange={setGenre}
									value={genre}
								>
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
									address &&
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
