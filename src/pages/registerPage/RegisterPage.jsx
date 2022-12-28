import React, { useState, useContext, useEffect } from "react";
import { PatientsContext } from "../../context/PatientsContext";
import Swal from "sweetalert2";
import { Center } from "@chakra-ui/react";
import NavBar from "../../components/sideBar/SideBar";
import PatientForm from "../../components/Form/patientForm/PatientForm";
import "./registerPage.css";
import Loading from "../../components/loading/Loading";

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
	const { setDataPatients, dataPatients, isLoading, setIsLoading } =
		useContext(PatientsContext);
	const [form, setForm] = useState(FORM_STATE_EMPTY);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

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

		Object.keys(form).forEach((key) => {
			if (NON_REQUIRED_FIELDS.includes(key)) {
				return;
			}
			if (form[key] === "") {
				validationMessages[key] = "Campo obrigatório!";
				result = false;
			}
		});

		if (!form.email.includes("@" && ".com")) {
			validationMessages.email = "Email inválido!";
			result = false;
		}

		if (form.cpf.length !== 11) {
			validationMessages.cpf = "CPF inválido!";
			result = false;
		}

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
			}).then(function (result) {
				if (result.value) {
					window.location = "/";
				}
			});
		}
	}

	return (
		<>
			<Center className="header" as="header">
				Cadastro de Pacientes
			</Center>
			<NavBar />
			{isLoading ? (
				<Loading />
			) : (
				<PatientForm
					form={form}
					handleOnChange={handleOnChange}
					formValidation={formValidation}
					handleOnChangeGenre={handleOnChangeGenre}
					handleSubmitForm={handleSubmitForm}
				/>
			)}
		</>
	);
}

export default RegisterPage;
