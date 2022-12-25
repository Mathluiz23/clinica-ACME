import React, { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";
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
										<Tr key={patient}>
											<Td>{patient.nome}</Td>
											<Td>{patient.CPF}</Td>
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
										<Tr key={patient}>
											<Td>{patient.nome}</Td>
											<Td>{patient.CPF}</Td>
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
							  })}
					</Tbody>
				</Table>
			)}
		</>
	);
}

export default Patients;
