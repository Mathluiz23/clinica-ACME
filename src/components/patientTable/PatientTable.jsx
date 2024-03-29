import React, { useContext } from "react";
import { PatientsContext } from "../../context/PatientsContext";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import "./patientTable.css";

function PatientTable() {
	const { dataPatients, isLoading, patientsFiltered } =
		useContext(PatientsContext);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Table data-testid="table-patients" className="table-patients">
					<Thead>
						<Tr>
							<Th data-testid="table-name">Nome</Th>
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

export default PatientTable;
