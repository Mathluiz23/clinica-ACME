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

const FORM_STATE_EMPTY = {
	name: "",
	email: "",
	cpf: "",
	phone: "",
	birthDate: "",
	address: "",
	city: "",
	status: "Ativo",
	genre: "Masculino",
};

function RegisterPage() {
	const { setDataPatients, dataPatients } = useContext(PatientsContext);
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [cpf, setCpf] = useState("");
	// const [phone, setPhone] = useState("");
	// const [birthDate, setBirthDate] = useState("");
	// const [address, setAddress] = useState("");
	// const [city, setCity] = useState("");
	// const [status, setStatus] = useState("Ativo");
	// const [genre, setGenre] = useState("Masculino");
	const [form, setForm] = useState(FORM_STATE_EMPTY);
	const [isValid, setIsValid] = useState(false);

	const handleOnChangeGenre = (value) => {
		console.log(value);
		setForm({
			...form,
			genre: value,
		});
	};

	const handleOnChange = (event) => {
		console.log(event);
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	function validateForm(newPatient) {
		if (newPatient.name !== "") {
			setIsValid(true);
		} else {
			setIsValid(false);
			console.log("NOME VAZIO");
		}

		if (newPatient.email !== "") {
			setIsValid(true);
		}

		if (
			newPatient.cpf !== "" ||
			newPatient.cpf.length === 11 ||
			newPatient.cpf !== dataPatients.map((patient) => patient.cpf)
		) {
			setIsValid(true);
		}

		if (newPatient.phone !== "") {
			setIsValid(true);
		}

		if (newPatient.birthDate === "") {
			setIsValid(true);
		}

		if (newPatient.city === "") {
			setIsValid(true);
		}

		if (isValid) {
			const newData = [...dataPatients, ...[newPatient]];
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

			setForm(FORM_STATE_EMPTY);
		}
	}

	function handleSubmitForm() {
		// id: dataPatients.length + 1,
		validateForm(form);
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
									onChange={handleOnChange}
									value={form.name}
								/>
								{/* {name === " " ? (
									<p>{`* Por favor informe um nome`}</p>
								) : null} */}
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input
									id="email"
									name="email"
									variant="filled"
									type="email"
									placeholder="exemplo@interprocess.com"
									onChange={handleOnChange}
									value={form.email}
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
									onChange={handleOnChange}
									value={form.birthDate}
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
									onChange={handleOnChange}
									value={form.cpf}
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
									onChange={handleOnChange}
									value={form.address}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="city">Cidade</FormLabel>
								<Input
									id="city"
									name="city"
									variant="filled"
									placeholder="Porto Alegre"
									onChange={handleOnChange}
									value={form.city}
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
									onChange={handleOnChange}
									value={form.phone}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel>Sexo</FormLabel>
								<RadioGroup
									name="genre"
									onChange={handleOnChangeGenre}
									value={form.genre}
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
									onChange={handleOnChange}
									value={form.status}
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
								isDisabled={false}
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
