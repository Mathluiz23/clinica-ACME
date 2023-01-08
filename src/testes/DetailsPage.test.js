/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-utils */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PatientsContextProvider from "../context/PatientsContext";
import DetailsPage from "../pages/detailsPage/DetailsPage";
import { BrowserRouter } from "react-router-dom";
import PatientForm from "../components/Form/patientForm/PatientForm";
import database from "../database";
import { RadioGroup } from "@chakra-ui/react";

function renderDetailsPage() {
	render(
		<BrowserRouter>
			<PatientsContextProvider>
				<DetailsPage />
			</PatientsContextProvider>
		</BrowserRouter>
	);
}

function renderFormDetail() {
	const form = database;
	const dataPatients = database;
	render(
		<BrowserRouter>
			<PatientsContextProvider>
				<PatientForm
					dataPatients={dataPatients}
					form={form}
					formValidation={{}}
					isEditForm={true}
				/>
			</PatientsContextProvider>
		</BrowserRouter>
	);
}

describe("Verifica página DetailsPage", () => {
	it("Se o DetailsPage é renderizado corretamente", () => {
		render(renderDetailsPage());
	});

	it("Se contém o título da página", () => {
		render(renderDetailsPage());

		const title = screen.getByText(/Detalhes do Paciente/i);
		expect(title).toBeInTheDocument();
	});

	it("Se contém o botão de editar o paciente", async () => {
		await render(renderFormDetail());

		const button = screen.getByTestId("edit-btn");
		expect(button).toBeInTheDocument();
	});

	it("Se contém o botão de salvar o paciente editado", () => {
		render(renderFormDetail());

		const button = screen.getByTestId("save-edit-btn");
		expect(button).toBeInTheDocument();
	});

	it("Se todos os campos estão preenchidos", () => {
		render(renderFormDetail());

		const name = screen.getByTestId("name-input");
		expect(name).toBeInTheDocument();

		const cpf = screen.getByTestId("cpf-input");
		expect(cpf).toBeInTheDocument();

		const birth = screen.getByTestId("birthDate-input");
		expect(birth).toBeInTheDocument();

		const phone = screen.getByTestId("phone-input");
		expect(phone).toBeInTheDocument();

		const email = screen.getByTestId("email-input");
		expect(email).toBeInTheDocument();

		const city = screen.getByTestId("city-input");
		expect(city).toBeInTheDocument();
	});

	it("se ao carregar a página, todos os campos de informação estão desabilitados para edição como disabled", () => {
		render(renderFormDetail());

		const name = screen.getByTestId("name-input");
		expect(name).toBeDisabled();

		const cpf = screen.getByTestId("cpf-input");
		expect(cpf).toBeDisabled();

		const birth = screen.getByTestId("birthDate-input");
		expect(birth).toBeDisabled();

		const phone = screen.getByTestId("phone-input");
		expect(phone).toBeDisabled();

		const email = screen.getByTestId("email-input");
		expect(email).toBeDisabled();

		const city = screen.getByTestId("city-input");
		expect(city).toBeDisabled();
	});

	it("se ao clicar no botão de editar, os campos de informação são habilitados para edição", () => {
		render(renderFormDetail());

		const buttonEdit = screen.getByTestId("edit-btn");
		fireEvent.click(buttonEdit);

		const name = screen.getByTestId("name-input");
		expect(name).not.toBeDisabled();

		const cpf = screen.getByTestId("cpf-input");
		expect(cpf).toBeDisabled();

		const birth = screen.getByTestId("birthDate-input");
		expect(birth).not.toBeDisabled();

		const phone = screen.getByTestId("phone-input");
		expect(phone).not.toBeDisabled();

		const email = screen.getByTestId("email-input");
		expect(email).not.toBeDisabled();

		const city = screen.getByTestId("city-input");
		expect(city).not.toBeDisabled();

		const genre = screen.getByTestId("genre-radio");
		expect(genre).not.toBeDisabled();

		const status = screen.getByTestId("status-select");
		expect(status).not.toBeDisabled();
	});

	it("Se quando o gênero do paciente é alterado ele é atualizado corretamente na váriavel form", () => {
		render(renderDetailsPage());

		const paciente = {
			name: "Teste",
			cpf: "12345678901",
			birthDate: "01/01/2000",
			phone: "11999999999",
			email: "teste@123.com",
			city: "São Paulo",
			genre: "Feminino",
			status: "Ativo",
		};

		screen.getByTestId("genre-radio");
		RadioGroup.id = "genre-radio";
		RadioGroup.value = "Masculino";

		const button = screen.getByTestId("save-edit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(paciente.genre).toBe("Masculino");
		});
	});

	it("Se os campos que houveram alteração foram atualizados", () => {
		render(renderDetailsPage());

		const paciente = {
			name: "Teste",
			cpf: "12345678901",
			birthDate: "01/01/2000",
			phone: "11999999999",
			email: "teste@123.com",
			city: "São Paulo",
			genre: "Feminino",
			status: "Ativo",
		};

		const buttonEdit = screen.getByTestId("edit-btn");
		fireEvent.click(buttonEdit);

		const name = screen.getByTestId("name-input");
		fireEvent.change(name, { target: { value: "Teste editado" } });

		const birth = screen.getByTestId("birthDate-input");
		fireEvent.change(birth, { target: { value: "01/01/2001" } });

		const phone = screen.getByTestId("phone-input");
		fireEvent.change(phone, { target: { value: "11999999998" } });

		const email = screen.getByTestId("email-input");
		fireEvent.change(email, { target: { value: "teste@editado.com" } });

		const city = screen.getByTestId("city-input");
		fireEvent.change(city, { target: { value: "São Paulo editado" } });

		screen.getByTestId("genre-radio");
		RadioGroup.id = "genre-radio";
		RadioGroup.value = "Masculino";

		const button = screen.getByTestId("save-edit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(paciente.name).toBe("Teste editado");
			expect(paciente.birthDate).toBe("01/01/2001");
			expect(paciente.phone).toBe("11999999998");
			expect(paciente.email).toBe("teste@editado.com");
			expect(paciente.city).toBe("São Paulo editado");
			expect(paciente.genre).toBe("Masculino");
		});
	});
});
