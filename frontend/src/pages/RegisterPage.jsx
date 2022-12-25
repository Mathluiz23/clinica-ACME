import React, { useState, useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
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
import { useEffect } from "react";

function RegisterPage() {
	const { setDataPatints } = useContext(PatientsContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [phone, setPhone] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [adress, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [status, setStatus] = useState("Ativo");
	const [genre, setGenre] = useState("1");
	const [dataLocalStorage, setDataLocalStorage] = useState([]);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		const dataLocalStorage = JSON.parse(localStorage.getItem("patients"));
		setDataLocalStorage(dataLocalStorage);
	}, []);

	function handleSubmitForm(event) {
		event.preventDefault();
		handleValidateForm();

		const newPatient = [
			{
				id: dataLocalStorage.length + 1,
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

		if (isValid) {
			const newData = [...dataLocalStorage, ...newPatient];
			setDataLocalStorage(newData);
			localStorage.setItem("patients", JSON.stringify(newData));
			setDataPatints(newData);
		}
	}

	function handleValidateForm() {
		if (name && email && cpf && phone && birthDate && city && status) {
			setIsValid(true);
		}
	}

	return (
		<>
			<Center className="header" as="header">
				Cadastro de Pacientes
			</Center>
			<Box className="box-form">
				<Flex className="form-container">
					<FormControl className="form">
						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nome">Nome</FormLabel>
								<Input
									id="nome"
									placeholder="Informe o nome completo"
									onChange={(event) => {
										setName(event.target.value);
									}}
									value={name}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input
									isRequired
									id="email"
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
								// isDisabled={isValid}
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
