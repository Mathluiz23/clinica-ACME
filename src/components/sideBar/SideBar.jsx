import { React } from "react";
import "./sideBar.css";

function SideBar() {
	return (
		<>
			<nav className="side-bar">
				<ul className="nav-links">
					<a className="nav-item" href="/">
						<li>Pacientes</li>
					</a>
					<a className="nav-item" href="/">
						<li>Empresa Parceira</li>
					</a>
					<a className="nav-item" href="/">
						<li>Localização</li>
					</a>
				</ul>
			</nav>
		</>
	);
}

export default SideBar;
