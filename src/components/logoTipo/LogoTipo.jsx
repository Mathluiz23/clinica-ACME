import logo from "../../assets/logotipo.jpg";
import "./logoTipo.css";

function LogoTipo() {
	return (
		<div className="logoTipo">
			<img src={logo} alt="logo" />
		</div>
	);
}

export default LogoTipo;
