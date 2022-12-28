import React, { useState } from "react";

import {
	Flex,
	Box,
	FormControl,
	Input,
	FormLabel,
	HStack,
	RadioGroup,
	Radio,
	Button,
	Select,
} from "@chakra-ui/react";
import FormErrorMessage from "./error/ErrorMessage";
import "../../../pages/registerPage/registerPage.css";

const PatientForm = ({
	form,
	handleOnChange,
	formValidation,
	handleOnChangeGenre,
	handleSubmitForm,
	isEditForm = false,
}) => {
	const [isEditing, setIsEditing] = useState(false);

	const isInputDisabled = isEditForm && !isEditing;

	return (
		<>
			<Flex className="form-container">
				<FormControl className="form">
					<HStack>
						<Box className="box-form">
							<FormLabel htmlFor="name">Nome</FormLabel>
							<Input
								name="name"
								variant="filled"
								type="text"
								placeholder="Informe o nome completo"
								onChange={handleOnChange}
								value={form.name}
								disabled={isInputDisabled}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="name"
							/>
						</Box>
						<Box className="box-form">
							<FormLabel htmlFor="email">E-mail</FormLabel>
							<Input
								name="email"
								variant="filled"
								type="email"
								placeholder="exemplo@interprocess.com"
								onChange={handleOnChange}
								value={form.email}
								disabled={isInputDisabled}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="email"
							/>
						</Box>
					</HStack>

					<HStack>
						<Box className="box-form">
							<FormLabel htmlFor="birthDate">
								Data de Nascimento
							</FormLabel>
							<Input
								name="birthDate"
								variant="filled"
								type="text"
								onChange={handleOnChange}
								value={form.birthDate}
								disabled={isInputDisabled}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="birthDate"
							/>
						</Box>
						<Box className="box-form">
							<FormLabel htmlFor="cpf">CPF</FormLabel>
							<Input
								name="cpf"
								variant="filled"
								type="number"
								placeholder="000-000.000-00"
								onChange={handleOnChange}
								value={form.cpf}
								disabled={isEditForm}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="cpf"
							/>
						</Box>
					</HStack>

					<HStack>
						<Box className="box-form">
							<FormLabel htmlFor="address">Endereço</FormLabel>
							<Input
								name="address"
								variant="filled"
								placeholder="Rua Brasil 1"
								onChange={handleOnChange}
								value={form.address}
								disabled={isInputDisabled}
							/>
						</Box>
						<Box className="box-form">
							<FormLabel htmlFor="city">Cidade</FormLabel>
							<Input
								name="city"
								variant="filled"
								placeholder="Porto Alegre"
								onChange={handleOnChange}
								value={form.city}
								disabled={isInputDisabled}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="city"
							/>
						</Box>
					</HStack>

					<HStack>
						<Box className="box-form">
							<FormLabel htmlFor="phone">Celular</FormLabel>
							<Input
								name="phone"
								variant="filled"
								type="number"
								placeholder="(51) 99999-9999"
								onChange={handleOnChange}
								value={form.phone}
								disabled={isInputDisabled}
							/>
							<FormErrorMessage
								errors={formValidation}
								fieldName="phone"
							/>
						</Box>
						<Box className="box-form">
							<FormLabel>Sexo</FormLabel>
							<RadioGroup
								name="genre"
								onChange={handleOnChangeGenre}
								value={form.genre}
								disabled={isInputDisabled}
							>
								<HStack>
									<Radio value="Masculino">Masculino</Radio>
									<Radio value="Feminino">Feminino</Radio>
									<Radio value="Outro">Outro</Radio>
								</HStack>
							</RadioGroup>
						</Box>
					</HStack>

					<HStack>
						<Box className="box-form">
							<FormLabel htmlFor="status">Status</FormLabel>
							<Select
								name="status"
								variant="flushed"
								onChange={handleOnChange}
								value={form.status}
								disabled={isInputDisabled}
							>
								<option value="Ativo">Ativo</option>
								<option value="Inativo">Inativo</option>
							</Select>
						</Box>
					</HStack>

					{!isEditForm ? (
						<HStack>
							<Button
								className="edit-and-submit-button"
								type="button"
								isDisabled={false}
								onClick={handleSubmitForm}
							>
								Enviar
							</Button>
						</HStack>
					) : (
						<HStack>
							<Button
								className="edit-and-submit-button"
								type="button"
								onClick={() => {
									setIsEditing(!isEditing);
								}}
								disabled={isEditing}
							>
								Editar
							</Button>

							<Button
								className="edit-and-submit-button"
								type="button"
								onClick={handleSubmitForm}
								disabled={!isEditing}
							>
								Salvar
							</Button>
						</HStack>
					)}
				</FormControl>
			</Flex>
		</>
	);
};

export default PatientForm;
