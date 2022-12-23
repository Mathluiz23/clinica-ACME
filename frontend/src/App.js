import "./App.css";
import PatientsContextProvider from "./context/PatientsContext";
import MainPage from "./pages/MainPage";

function App() {
	return (
		<PatientsContextProvider>
			<MainPage />
		</PatientsContextProvider>
	);
}

export default App;
