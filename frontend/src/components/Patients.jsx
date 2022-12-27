import React, { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import "../style/patients.css";

function Patients() {
	const { dataPatients, isLoading, patientsFiltered } =
		useContext(PatientsContext);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Table id="patientsList" className="table-patients">
					<Thead>
						<Tr>
							<Th>Nome</Th>
							<Th>CPF</Th>
							<Th>Status</Th>
							<Th>Ações</Th>
						</Tr>
					</Thead>
					<Tbody>
						{patientsFiltered.length > 0
							? patientsFiltered.map((patient) => {
									return (
										<Tr key={patient.id}>
											<Td>{patient.name}</Td>
											<Td>{patient.cpf}</Td>
											<Td>{patient.status}</Td>
											<Td>
												<a
													href={`/details/${patient.id}`}
												>
													Ver detalhes
												</a>
											</Td>
										</Tr>
									);
							  })
							: dataPatients.map((patient) => {
									return (
										<Tr key={patient.id}>
											<Td>{patient.name}</Td>
											<Td>{patient.cpf}</Td>
											<Td>{patient.status}</Td>
											<Td>
												<Link
													to={`/details/${patient.id}`}
												>
													Ver detalhes
												</Link>
											</Td>
										</Tr>
									);
							  })}
					</Tbody>
				</Table>
			)}
		</>
	);
}

export default Patients;
