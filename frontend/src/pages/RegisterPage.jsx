import React, { useState, useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import Swal from "sweetalert2";
import "../style/registerPage.css";

import { Center } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import PatientForm from "../components/Form/PatientForm";

const NON_REQUIRED_FIELDS = ["address"];

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
	const [form, setForm] = useState(FORM_STATE_EMPTY);
	const [formValidation, setFormValidation] = useState({});
	console.log(formValidation);

	const handleOnChangeGenre = (value) => {
		setForm({
			...form,
			genre: value,
		});
	};

	const handleOnChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const isFormValid = () => {
		let result = true;
		let validationMessages = {};

		//Verificando se algum dos inputs está vazio
		Object.keys(form)
			.filter((attributeName) => {
				return !NON_REQUIRED_FIELDS.includes(attributeName);
			})
			.map((attributeName) => {
				if (form[attributeName] === "") {
					validationMessages[attributeName] = "Campo obrigatório!";
					result = false;
				}
			});

		//Verificando se o CPF é válido
		if (form.cpf.length !== 11) {
			validationMessages.cpf = "CPF inválido!";
			result = false;
		}

		// Verificando se o CPF já foi cadastrado
		if (dataPatients.find((patient) => patient.cpf === form.cpf)) {
			validationMessages.cpf = "CPF já cadastrado!";
			result = false;
		}

		setFormValidation(validationMessages);
		return result;
	};

	function handleSubmitForm() {
		if (isFormValid()) {
			const newData = [
				...dataPatients,
				...[
					{
						...form,
						id: dataPatients.length + 1,
					},
				],
			];
			localStorage.setItem("patients", JSON.stringify(newData));
			setDataPatients(newData);
			setForm(FORM_STATE_EMPTY);

			Swal.fire({
				title: "Paciente Cadastrado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});
		}
	}

	return (
		<>
			<Center className="header" as="header">
				Cadastro de Pacientes
			</Center>
			<NavBar />
			<PatientForm
				form={form}
				handleOnChange={handleOnChange}
				formValidation={formValidation}
				handleOnChangeGenre={handleOnChangeGenre}
				handleSubmitForm={handleSubmitForm}
			/>
		</>
	);
}

export default RegisterPage;
