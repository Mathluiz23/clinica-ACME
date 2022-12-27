import { React, useState, useContext, useEffect } from "react";
import "../style/shared.css";
import { PatientsContext } from "../context/PatientsContext";
import { useLocation } from "react-router-dom";

import Loading from "../components/Loading";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";
import PatientForm from "../components/Form/PatientForm";

const NON_REQUIRED_FIELDS = ["address"];

function DetailsPage() {
	const { dataPatients, isLoading, setDataPatients } =
		useContext(PatientsContext);

	const [isUserValid, setIsUserValid] = useState(null);
	const [register, setRegister] = useState({});
	const [formValidation, setFormValidation] = useState({});

	const { pathname } = useLocation();
	const patientId = pathname.split("/")[2];

	useEffect(() => {
		if (dataPatients.length) {
			const currentPatient = dataPatients.find((patient) => {
				return patient.id === +patientId;
			});

			if (currentPatient) {
				setRegister(currentPatient);
				setIsUserValid(true);
			} else {
				setIsUserValid(false);
			}
		}
	}, [patientId, dataPatients]);

	// function handleEditPatient() {
	// 	setIsEdit(true);
	// }

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
			if (NON_REQUIRED_FIELDS.includes(key)) {
				continue;
			}
			if (register[key] === "") {
				result = false;
				validationMessages[key] = "Campo Obrigatório";
			}
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

			newPatients[patientIndex] = register;

			localStorage.setItem("patients", JSON.stringify(newPatients));
			setDataPatients(newPatients);

			Swal.fire({
				title: "Paciente Atualizado com Sucesso!",
				icon: "success",
				confirmButtonText: "OK",
				confirmButtonColor: "#2D9CDB",
			});
		}
	}

	return (
		<>
			<h1 className="header">Detalhes do Paciente</h1>
			<NavBar />

			{isUserValid === false && <h1>Usuário não encontrado</h1>}

			{isLoading ? (
				<Loading />
			) : (
				<PatientForm
					form={register}
					handleOnChange={handleOnChange}
					formValidation={formValidation}
					handleOnChangeGenre={handleOnChangeGenre}
					handleSubmitForm={handleUpdatePatient}
					isEditForm={true}
				/>
			)}
		</>
	);
}

export default DetailsPage;
