import React, { useState, useContext } from "react";
import { PatientsContext } from "../../context/PatientsContext";
import Swal from "sweetalert2";
import "./registerPage.css";

import { Center } from "@chakra-ui/react";
import NavBar from "../../components/sideBar/SideBar";
import PatientForm from "../../components/Form/PatientForm";

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
		console.log("FOORM", form);
	};

	const isFormValid = () => {
		let result = true;
		let validationMessages = {};

		//Verificando se algum dos inputs está vazio
		Object.keys(form).forEach((key) => {
			if (NON_REQUIRED_FIELDS.includes(key)) {
				return;
			}
			if (form[key] === "") {
				validationMessages[key] = "Campo obrigatório!";
				result = false;
			}
		});

		// Verificando se o email é válido
		if (!form.email.includes("@" && ".com")) {
			validationMessages.email = "Email inválido!";
			result = false;
		}

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
