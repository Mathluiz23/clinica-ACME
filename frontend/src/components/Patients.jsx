import React, { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";

function Patients() {
	const { dataPatients } = useContext(PatientsContext);
	return (
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
				{dataPatients.map((patient) => {
					return (
						<tr key={patient}>
							<td>{patient.Nome}</td>
							<td>{patient.CPF}</td>
							<td>{patient.Status}</td>
							<td>
								<a>Editar</a>
								<a>Ver detalhes</a>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Patients;
