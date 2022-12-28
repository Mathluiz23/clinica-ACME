import { React } from "react";
import "./sideBar.css";

function SideBar() {
	return (
		<>
			<nav className="side-bar">
				<ul className="nav-links">
					<a className="nav-item" href="/">
						<li>Home</li>
					</a>
					<a className="nav-item" href="/">
						<li>Pacientes</li>
					</a>
					<a
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
