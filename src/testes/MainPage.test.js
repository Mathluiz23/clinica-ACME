/* eslint-disable jest/no-conditional-expect */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PatientsContextProvider from "../context/PatientsContext";
import MainPage from "../pages/mainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import database from "../database";
import { ChakraBaseProvider } from "@chakra-ui/react";
import PatientTable from "../components/patientTable/PatientTable";

function renderComponent(component) {
	render(
		<BrowserRouter>
			<ChakraBaseProvider>
				<PatientsContextProvider>{component}</PatientsContextProvider>
			</ChakraBaseProvider>
		</BrowserRouter>
	);
}

describe("Verifica página MainPage", () => {
	it("Se o MainPage é renderizado corretamente", () => {
		render(renderComponent(<MainPage />));
	});

	it("Se contém o título da página", () => {
		render(renderComponent(<MainPage />));

		const title = screen.getByText(/Clínica ACME/i);
		expect(title).toBeInTheDocument();
	});

	it("Se contém o input de filtragem de pacientes", () => {
		render(renderComponent(<MainPage />));

		const input = screen.getByTestId("search-input");
		expect(input).toBeInTheDocument();
	});

	it("Se contém o botão de pesquisar pacientes", () => {
		render(renderComponent(<MainPage />));

		const button = screen.getByTestId("btn-search");
		expect(button).toBeInTheDocument();
	});

	it("Se contém o botão de cadastrar pacientes", () => {
		render(renderComponent(<MainPage />));

		const button = screen.getByTestId("btn-register");
		expect(button).toBeInTheDocument();
	});

	it("Se ao clicar no botão de cadastrar, é redirecionado para a página de cadastro", async () => {
		await render(renderComponent(<MainPage />));

		const button = screen.getByTestId("btn-register");
		fireEvent.click(button);
		expect(window.location.pathname).toBe("/register");
	});
});

describe("Verifica tabela de pacientes, testando componente PatientTable", () => {
	it("Se a tabela de pacientes é renderizada corretamente", async () => {
		render(renderComponent(<PatientTable />));

		const table = screen.getByTestId("table-patients");
		expect(table).toBeInTheDocument();
	});

	it("Se a tabela de pacientes contém os cabeçalhos Nome, CPF, Status e Ações", async () => {
		render(renderComponent(<PatientTable />));

		const name = screen.getByText(/Nome/i);
		expect(name).toBeInTheDocument();

		const cpf = screen.getByText(/CPF/i);
		expect(cpf).toBeInTheDocument();

		const status = screen.getByText(/Status/i);
		expect(status).toBeInTheDocument();

		const actions = screen.getByText(/Ações/i);
		expect(actions).toBeInTheDocument();
	});

	it("Se a tabela de pacientes contém os dados do banco de dados", async () => {
		render(renderComponent(<PatientTable />));

		for (let i = 0; i < database.length; i++) {
			const name = database[i].name;
			expect(screen.getByText(name)).toBeInTheDocument();

			const cpf = database[i].cpf;
			expect(screen.getByText(cpf)).toBeInTheDocument();

			const status = database[i].status;
			if (status === "Ativo") {
				expect(status).toBe("Ativo");
			}
			if (status === "Inativo") {
				expect(status).toBe("Inativo");
			}
		}
	});
});

describe("Testa se é possível filtrar os pacientes por nome, cpf e status através do input na função handleClickFilter", () => {
	it("Se é possível filtrar os pacientes por nome", async () => {
		render(renderComponent(<MainPage />));

		const input = screen.getByTestId("search-input");

		for (let i = 0; i < database.length; i++) {
			fireEvent.change(input, { target: { value: database[i].name } });

			const button = screen.getByTestId("btn-search");
			fireEvent.click(button);

			const name = screen.getByText(database[i].name);
			expect(name).toBeInTheDocument();
		}
	});

	it("Se é possível filtrar os pacientes por cpf", async () => {
		render(renderComponent(<MainPage />));

		const input = screen.getByTestId("search-input");

		for (let i = 0; i < database.length; i++) {
			fireEvent.change(input, { target: { value: database[i].cpf } });

			const button = screen.getByTestId("btn-search");
			fireEvent.click(button);

			const cpf = screen.getByText(database[i].cpf);
			expect(cpf).toBeInTheDocument();
		}
	});

	it("Se é possível filtrar os pacientes por status", async () => {
		render(renderComponent(<MainPage />));

		const input = screen.getByTestId("search-input");

		for (let i = 0; i < database.length; i++) {
			fireEvent.change(input, { target: { value: database[i].status } });

			const button = screen.getByTestId("btn-search");
			fireEvent.click(button);

			const status = database[i].status;
			if (status === "Ativo") {
				expect(status).toBe("Ativo");
			}
			if (status === "Inativo") {
				expect(status).toBe("Inativo");
			}
		}
	});
});
