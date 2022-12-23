import { React } from "react";
import Patients from "../components/Patients";

function MainPage() {
	return (
		<>
			<section>
				<input type="text" value="" />
				<button>Cadastrar Paciente</button>
			</section>
			<Patients />
		</>
	);
}

export default MainPage;
