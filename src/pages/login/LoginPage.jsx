import React, { useState } from "react";
import {
	Flex,
	Heading,
	Input,
	Button,
	useColorMode,
	useColorModeValue,
	Switch,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import { userList } from "../../database";
import Swal from "sweetalert2";
import FormErrorMessage from "../../components/Form/patientForm/error/ErrorMessage";
import "../../components/Form/patientForm/error/errorMessage.css";
import "./loginPage.css";
import logo from "../../assets/CardACME.png";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formValidation, setFormValidation] = useState({});
	const { toggleColorMode } = useColorMode();
	const formBackground = useColorModeValue("gray.100", "#070c52");
	let validationMessages = {};

	function emailValidate() {
		let result = false;

		if (email === "") {
			validationMessages.email = "Campo Obrigatório!";
		} else if (userList.find((user) => user.email === email)) {
			validationMessages.email = "";
			result = true;
		} else {
			validationMessages.email = "Email não encontrado!";
		}
		return result;
	}

	function passwordValidate() {
		let result = false;

		if (password === "") {
			validationMessages.password = "Campo Obrigatório!";
		} else if (
			userList.find(
				(user) => user.password === password && user.email === email
			)
		) {
			validationMessages.password = "";
			result = true;
		} else {
			validationMessages.password = "Senha incorreta!";
		}
		return result;
	}

	function handleLogin() {
		const validLogin = emailValidate();
		const validPassword = passwordValidate();

		setFormValidation(validationMessages);

		if (validPassword && validLogin) {
			Swal.fire({
				icon: "success",
				title: "Bem Vindo ao Sistema de Saúde ACME",
				showConfirmButton: false,
				timer: 1500,
			});

			setTimeout(() => {
				window.location.href = "/patient";
			}, 1500);
		}
	}

	return (
		<Flex className="container-login" bg={formBackground}>
			<Flex>
				<Flex className="card-login">
					<img src={logo} alt="logo" />
				</Flex>
				<Flex p={12} boxShadow="lg" className="form-login">
					<Heading mb={6}>Log In</Heading>
					<Input
						placeholder="meuemail@login.com"
						type="email"
						variant="filled"
						mb={3}
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<FormErrorMessage
						errors={formValidation}
						fieldName="email"
					/>
					<Input
						placeholder="**********"
						type="password"
						variant="filled"
						mb={6}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<FormErrorMessage
						errors={formValidation}
						fieldName="password"
					/>
					<Button
						colorScheme="teal"
						mb={8}
						onClick={() => handleLogin()}
						type="button"
					>
						Log In
					</Button>
					<FormControl className="switch-theme">
						<FormLabel htmlFor="dark_mode" mb="0">
							Enable Dark Mode?
						</FormLabel>
						<Switch
							id="dark_mode"
							colorScheme="teal"
							size="lg"
							onChange={toggleColorMode}
						/>
					</FormControl>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Login;
