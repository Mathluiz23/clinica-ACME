/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PatientsContextProvider from "../context/PatientsContext";
import RegisterPage from "../pages/registerPage/RegisterPage";
import { BrowserRouter } from "react-router-dom";
import PatientForm from "../components/Form/patientForm/PatientForm";
import database from "../database";
import { RadioGroup } from "@chakra-ui/react";

const data = database;

function renderRegisterPage() {
	render(
		<BrowserRouter>
			<PatientsContextProvider>
				<RegisterPage form={data} formValidation={data} />
			</PatientsContextProvider>
		</BrowserRouter>
	);
}

function renderPatientForm() {
	render(
		<BrowserRouter>
			<PatientsContextProvider>
				<PatientForm form={data} formValidation={data} />
			</PatientsContextProvider>
		</BrowserRouter>
	);
}

describe("Verifica página RegisterPage", () => {
	it("Se o RegisterPage é renderizado corretamente", () => {
		renderRegisterPage();
	});

	it("Se contém o título da página", () => {
		renderRegisterPage();

		const title = screen.getByText(/Cadastro de Pacientes/i);
		expect(title).toBeInTheDocument();
	});

	it("Se possui todos os campos para realizar cadastro", () => {
		renderPatientForm();

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

		const state = screen.getByTestId("status-select");
		expect(state).toBeInTheDocument();

		const genre = screen.getByTestId("genre-radio");
		expect(genre).toBeInTheDocument();
	});

	it("Se retorna um mensagem de erro caso campo nome seja inválido", () => {
		renderPatientForm();

		const name = screen.getByTestId("name-input");
		fireEvent.change(name, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo cpf seja inválido", () => {
		renderPatientForm();

		const cpf = screen.getByTestId("cpf-input");
		fireEvent.change(cpf, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo data de nascimento seja inválido", () => {
		renderPatientForm();

		const birth = screen.getByTestId("birthDate-input");
		fireEvent.change(birth, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo telefone seja inválido", () => {
		renderPatientForm();

		const phone = screen.getByTestId("phone-input");
		fireEvent.change(phone, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo email esteja vazio", () => {
		renderPatientForm();

		const email = screen.getByTestId("email-input");
		fireEvent.change(email, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo email seja inválido, sem @", () => {
		renderPatientForm();

		const email = screen.getByTestId("email-input");
		fireEvent.change(email, { target: { value: "teste.com" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
		});
	});

	it("Se retorna um mensagem de erro caso campo cidade seja inválido", () => {
		renderPatientForm();

		const city = screen.getByTestId("city-input");
		fireEvent.change(city, { target: { value: "" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByText(/Campo Obrigatório/i)).toBeInTheDocument();
		});
	});

	it("Se o Loading é exibido quando os arquivos estão sem carregados", () => {
		renderPatientForm();

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(screen.getByTestId("loading")).toBeInTheDocument();
		});
	});

	it("Se após o cadastro ser submetido, retorna uma mensagem de sucesso", () => {
		renderPatientForm();

		const name = screen.getByTestId("name-input");
		fireEvent.change(name, { target: { value: "Teste" } });

		const cpf = screen.getByTestId("cpf-input");
		fireEvent.change(cpf, { target: { value: "12345678901" } });

		const birth = screen.getByTestId("birthDate-input");
		fireEvent.change(birth, { target: { value: "01/01/2000" } });

		const phone = screen.getByTestId("phone-input");
		fireEvent.change(phone, { target: { value: "11999999999" } });

		const email = screen.getByTestId("email-input");
		fireEvent.change(email, { target: { value: "teste@123.com" } });

		const city = screen.getByTestId("city-input");
		fireEvent.change(city, { target: { value: "São Paulo" } });

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(
				screen.getByText(/Cadastro realizado com sucesso/i)
			).toBeInTheDocument();
		});
	});

	it("Se quando o gênero do paciente é selecionado ele é inserido corretamente na váriavel form", async () => {
		renderRegisterPage();

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

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(paciente.genre).toBe("Masculino");
		});
	});

	it("Se os campos foram atualizados no cadastro", () => {
		renderRegisterPage();

		const name = screen.getByTestId("name-input");
		fireEvent.change(name, { target: { value: "Teste editado" } });

		const cpf = screen.getByTestId("cpf-input");
		fireEvent.change(cpf, { target: { value: "92345678909" } });

		const birthDate = screen.getByTestId("birthDate-input");
		fireEvent.change(birthDate, { target: { value: "01/01/2001" } });

		const phone = screen.getByTestId("phone-input");
		fireEvent.change(phone, { target: { value: "11999999998" } });

		const email = screen.getByTestId("email-input");
		fireEvent.change(email, { target: { value: "teste@editado.com" } });

		const city = screen.getByTestId("city-input");
		fireEvent.change(city, { target: { value: "São Paulo editado" } });

		const genre = screen.getByTestId("genre-radio");
		RadioGroup.id = "genre-radio";
		RadioGroup.value = "Masculino";

		const button = screen.getByTestId("submit-btn");
		fireEvent.click(button);

		waitFor(() => {
			expect(name).toBe("Teste editado");
			expect(cpf).toBe("92345678909");
			expect(birthDate).toBe("01/01/2001");
			expect(phone).toBe("11999999998");
			expect(email).toBe("teste@editado.com");
			expect(city).toBe("São Paulo editado");
			expect(genre).toBe("Masculino");
		});
	});
});
