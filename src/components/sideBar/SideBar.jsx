import { React } from "react";
import "./sideBar.css";

function SideBar() {
	return (
		<>
			<nav className="side-bar">
				<ul className="nav-links">
					<a
						data-testid="link-home"
						className="nav-item"
						href="/patient"
					>
						<li>Home</li>
					</a>
					<a
						data-testid="link-pacientes"
						className="nav-item"
						href="/patient"
					>
						<li>Pacientes</li>
					</a>
					<a
						data-testid="link-empresa"
						className="nav-item"
						href="https://www.interprocess.com.br/"
						target="blank"
					>
						<li>Empresa Parceira</li>
					</a>
				</ul>
			</nav>
		</>
	);
}

export default SideBar;
