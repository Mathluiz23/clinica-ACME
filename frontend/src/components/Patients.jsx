import React, { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import Loading from "./Loading";

function Patients() {
	const { dataPatients, isLoading, patientsFiltered } =
		useContext(PatientsContext);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<table id="patientsList">
					<thead>
						<tr>
							<th>Nome</th>
							<th>CPF</th>
							<th>Status</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{patientsFiltered.length > 0
							? patientsFiltered.map((patient) => {
									return (
										<tr key={patient}>
											<td>{patient.nome}</td>
											<td>{patient.CPF}</td>
											<td>{patient.status}</td>
											<td>
												<a>Editar</a>
												<a>Ver detalhes</a>
											</td>
										</tr>
									);
							  })
							: dataPatients.map((patient) => {
									return (
										<tr key={patient}>
											<td>{patient.nome}</td>
											<td>{patient.CPF}</td>
											<td>{patient.status}</td>
											<td>
												<a>Editar</a>
												<a>Ver detalhes</a>
											</td>
										</tr>
									);
							  })}
					</tbody>
				</table>
			)}
		</>
	);
}

export default Patients;
