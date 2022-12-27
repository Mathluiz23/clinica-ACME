import { React, useState, useContext, useEffect } from "react";
import "../style/shared.css";
import { PatientsContext } from "../context/PatientsContext";
import { useLocation } from "react-router-dom";
import FormErrorMessage from "../components/ErrorMessage";

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

	const [isEdit, setIsEdit] = useState(false);

	const [register, setRegister] = useState([]);
	const [formValidation, setFormValidation] = useState({});

	const { pathname } = useLocation();
	const patientId = pathname.split("/")[2];
	// console.log("ID DA URL", patientId);

	useEffect(() => {
		const [patientById] = dataPatients.filter(
			(patient) => patient.id === +patientId
		);

		if (patientById !== undefined) {
			const FORM_STATE_ACTUAL = {
				name: patientById.name,
				email: patientById.email,
				cpf: patientById.cpf,
				phone: patientById.phone,
				birthDate: patientById.birthDate,
				address: patientById.address,
				city: patientById.city,
				status: patientById.status,
				genre: patientById.genre,
			};

			setRegister(FORM_STATE_ACTUAL);
		}
	}, []);

	function handleEditPatient() {
		setIsEdit(true);
	}

	const handleOnChangeGenre = (value) => {
		// console.log(value);
		setRegister({
			...register,
			genre: value,
		});
	};

	const handleOnChange = (event) => {
		setRegister({
			...register,
			[event.target.name]: event.target.value,
		});
	};

	const isFormValid = () => {
		let result = true;
		let validationMessages = {};

		//Verificando se algum dos inputs está vazio
		for (const key in register) {
			console.log(key, register, "KEEY E REGISTER AQUIIIII");
			if (register[key] === "") {
				result = false;
				validationMessages[key] = "Campo Obrigatório";
			}
		}

		//Verificando se o CPF é válido
		if (
			register.cpf.length !== dataPatients.map((patient) => patient.cpf)
		) {
			result = false;
			validationMessages.cpf = "CPF já cadastrado";
		}

		//Verificando se o telefone é válido
		if (register.cpf.length !== 11) {
			result = false;
			validationMessages.phone = "CPF Inválido";
		}

		setFormValidation(validationMessages);
		return result;
	};

	function handleUpdatePatient() {
		if (isFormValid()) {
			const [patientById] = dataPatients.filter(
				(patient) => patient.id === +patientId
			);

			const patientIndex = dataPatients.indexOf(patientById);

			const newPatients = [...dataPatients];

			newPatients[patientIndex] = {
				...newPatients[patientIndex],
				name: register.name,
				email: register.email,
				cpf: register.cpf,
				phone: register.phone,
				birthDate: register.birthDate,
				address: register.address,
				city: register.city,
				status: register.status,
				genre: register.genre,
			};

			setDataPatients(newPatients);

			Swal.fire({
				title: "Paciente Atualizado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});
		}
		setIsEdit(false);
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
										name="name"
										onChange={handleOnChange}
										value={register.name}
										disabled={isEdit ? false : true}
										isRequired={true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="email">
										E-mail
									</FormLabel>
									<Input
										isRequired={true}
										name="email"
										type="email"
										onChange={handleOnChange}
										value={register.email}
										disabled={isEdit ? false : true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
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
										onChange={handleOnChange}
										value={register.birthDate}
										disabled={isEdit ? false : true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="cpf">CPF</FormLabel>
									<Input
										name="cpf"
										type="number"
										onChange={handleOnChange}
										value={register.cpf}
										disabled={isEdit ? false : true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
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
										onChange={handleOnChange}
										value={register.adress}
										disabled={isEdit ? false : true}
									/>
								</Box>
								<Box className="box-form">
									<FormLabel htmlFor="city">Cidade</FormLabel>
									<Input
										name="city"
										onChange={handleOnChange}
										value={register.city}
										disabled={isEdit ? false : true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
									/>
								</Box>
							</HStack>

							<HStack>
								<Box className="box-form">
									<FormLabel htmlFor="phone">
										Celular
									</FormLabel>
									<Input
										name="phone"
										type="number"
										onChange={handleOnChange}
										value={register.phone}
										disabled={isEdit ? false : true}
									/>
									<FormErrorMessage
										errors={formValidation}
										fieldName="name"
									/>
								</Box>
								<Box className="box-form">
									<FormLabel>Sexo</FormLabel>
									<RadioGroup
										name="genre"
										onChange={handleOnChangeGenre}
										value={register.genre}
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
										name="status"
										variant="flushed"
										onChange={handleOnChange}
										value={register.status}
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
