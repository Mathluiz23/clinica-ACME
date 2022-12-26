import { React } from "react";
import "../style/shared.css";

import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	HStack,
	RadioGroup,
	Radio,
	Select,
} from "@chakra-ui/react";

function DetailsPage() {
	return (
		<>
			<h1 className="header">Detalhes do Paciente</h1>
			<Box className="box-form">
				<Flex className="form-container">
					<FormControl className="form">
						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nome">Nome</FormLabel>
								<Input
									id="nome"
									onChange={(event) => {
										setName(event.target.value);
									}}
									value={name}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input
									isRequired
									id="email"
									type="email"
									onChange={(event) => {
										setEmail(event.target.value);
									}}
									value={email}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="nasc">
									Data de Nascimento
								</FormLabel>
								<Input
									id="nasc"
									type="date"
									onChange={(event) => {
										setBirthDate(event.target.value);
									}}
									value={birthDate}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="cpf">CPF</FormLabel>
								<Input
									id="cpf"
									type="number"
									placeholder="000-000.000-00"
									onChange={(event) => {
										setCpf(event.target.value);
									}}
									value={cpf}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="endereco">
									Endereço
								</FormLabel>
								<Input
									id="endereco"
									placeholder="Rua Brasil 1"
									onChange={(event) => {
										setAddress(event.target.value);
									}}
									value={adress}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel htmlFor="cidade">Cidade</FormLabel>
								<Input
									id="cidade"
									placeholder="Porto Alegre"
									onChange={(event) => {
										setCity(event.target.value);
									}}
									value={city}
								/>
							</Box>
						</HStack>

						<HStack>
							<Box className="box-form">
								<FormLabel htmlFor="cel">Celular</FormLabel>
								<Input
									id="cel"
									type="number"
									placeholder="(51) 99999-9999"
									onChange={(event) => {
										setPhone(event.target.value);
									}}
									value={phone}
								/>
							</Box>
							<Box className="box-form">
								<FormLabel>Sexo</FormLabel>
								<RadioGroup onChange={setGenre} value={genre}>
									<HStack>
										<Radio value="Masculino">
											Masculino
										</Radio>
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
									variant="flushed"
									onChange={(event) => {
										setStatus(event.target.value);
									}}
								>
									<option value="Ativo">Ativo</option>
									<option value="Inativo">Inativo</option>
								</Select>
							</Box>
						</HStack>
					</FormControl>
				</Flex>
			</Box>
		</>
	);
}

export default DetailsPage;
