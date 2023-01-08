import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PatientsContextProvider from "../context/PatientsContext";

import { BrowserRouter } from "react-router-dom";
import SideBar from "../components/sideBar/SideBar";

function renderSideBar() {
	render(
		<BrowserRouter>
			<PatientsContextProvider>
				<SideBar />
			</PatientsContextProvider>
		</BrowserRouter>
	);
}

describe("Verifica componente SideBar", () => {
	it("Se o SideBar é renderizado corretamente", () => {
		render(renderSideBar());
	});

	it("Se contém o links Home, Pacientes e Empresa Parceira", () => {
		render(renderSideBar());

		const home = screen.getByText(/Home/i);
		expect(home).toBeInTheDocument();

		const patients = screen.getByText(/Pacientes/i);
		expect(patients).toBeInTheDocument();

		const partner = screen.getByText(/Empresa Parceira/i);
		expect(partner).toBeInTheDocument();
	});

	it("Se os link Home encaminha para a rota correta após o click", () => {
		render(renderSideBar());

		const home = screen.getByText("Home");
		fireEvent.click(home);
		expect(window.location.pathname).toBe("/");
	});

	it("Se os link Pacientes encaminha para a rota correta após o click", () => {
		render(renderSideBar());

		const patients = screen.getByText("Pacientes");
		fireEvent.click(patients);
		expect(window.location.pathname).toBe("/");
	});

	it("Se os link Empresa Parceira encaminha para a rota correta após o click", () => {
		render(renderSideBar());

		const partner = screen.getByText("Empresa Parceira");
		fireEvent.click(partner);
		expect("https://www.interprocess.com.br/").toBe(
			"https://www.interprocess.com.br/"
		);
	});
});
