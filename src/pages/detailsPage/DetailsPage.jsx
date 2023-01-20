import { React, useState, useContext, useEffect } from "react";
import { PatientsContext } from "../../context/PatientsContext";
import { useLocation } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";
import SideBar from "../../components/sideBar/SideBar";
import PatientForm from "../../components/Form/patientForm/PatientForm";
import { Center } from "@chakra-ui/react";
import LogoTipo from "../../components/logoTipo/LogoTipo";

const NON_REQUIRED_FIELDS = ["address"];

function DetailsPage() {
	const { dataPatients, isLoading, setDataPatients, setIsLoading } =
		useContext(PatientsContext);

	const [isUserValid, setIsUserValid] = useState(null);
	const [register, setRegister] = useState({});
	const [formValidation, setFormValidation] = useState({});

	const { pathname } = useLocation();
	const patientId = pathname.split("/")[2];

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

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

	const handleOnChangeGenre = (value) => {
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

		for (const key in register) {
			if (NON_REQUIRED_FIELDS.includes(key)) {
				continue;
			}
			if (register[key] === "") {
				result = false;
				validationMessages[key] = "Campo Obrigatório";
			}
		}

		if (!register.email.includes("@" && ".com")) {
			validationMessages.email = "Email inválido!";
			result = false;
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
			}).then(function (result) {
				if (result.value) {
					window.location = "/patient";
				}
			});
		}
	}

	return (
		<>
			<Center className="header">Detalhes do Paciente</Center>
			<LogoTipo />
			<SideBar />

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
