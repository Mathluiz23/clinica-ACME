<h1 align="center"> Clínica ACME </h1>

## 🖥️📱 Deploy

Neste link você tem acesso ao projeto disponibilizado na web.

click aqui: \*REALIZAR DEPLOY E DISPONIBILIZAR LINK

## 💻 Projeto

Este projeto consiste em uma aplicação de consultar e cadastrar pacientes. Onde será possível:

-   Visualizar os pacientes cadastrados através de uma tabela.
-   Filtrar pacientes por nome, CPF ou status.
-   Cadastrar novos pacientes.
-   Editar o cadastro de um paciente.

<details>
  <summary><strong>Tela Principal</strong></summary><br />
  
  ### Na tela principal você pode visualizar tabela com todos os pacientes cadastrados, contendo informações resumidas sobre cada um deles com:
- Nome
- CPF
- Status

### Pesquisar pacientes cadastrados, filtrando por nome, CPF e status.

### Botão de cadastrar pacientes, levará para uma página de cadastro.

### Clicando em ver detalhes na linha da tabela de cada paciente, levará para uma página de detahes de cada paciente, contendo todas as informações cadastradas.

## ⏯️ Demonstração

<div align="center">
    <img alt="gif de apresentação" src=""/>
</div>

</details>

<details>
  <summary><strong>Tela de Cadastro</strong></summary><br />
  
  ### Nesta tela você poderá realizar o cadastro de um novo paciente. Na página inicial, clicando em cadastrar paciente, você é encaminhado para esta página, onde há um formulário com os seguintes campos para preenchimento:
- Nome (obrigatório)
- Email (obrigatório)
- Data de Nascimento (obrigatório)
- CPF (obrigatório)
- Endereço (opcional)
- Cidade (obrigatório)
- Celular (obrigatório)
- Sexo (obrigatório)
- Status (obrigatório)

Após o preenchimento das informações obrigatórias, será possível cadastrar o paciente clicando no botão de Enviar.
Caso todos os campos sejam válidos, você receberá a mensagem `Paciente cadastrado com sucesso` , caso algum dos campos seja inválido ou o CPF informado já tenha sido cadastrado, você receberá uma `mensagem de erro` no campo referente a informação.

### ⏯️ Demonstração

<div align="center">
    <img alt="gif de apresentação" src=""/>
</div>

</details>

<details>
  <summary><strong>Tela de Detalhes</strong></summary><br />
  
  ### Nesta tela você poderá visualizar as informações completas de cada paciente:
- Nome
- Email
- Data de Nascimento
- CPF
- Endereço
- Cidade
- Celular
- Sexo
- Status

### Também será possível editar o cadastro do paciente. Clicando no botão editar, irá habilitar os campos para modificar as informações. Após feita a alteração, para salvar as alterações, basta clicar no botão salvar(você receberá uma mensagem de confirmação que o paciente foi atualizado).

### ⏯️ Demonstração

<div align="center">
    <img alt="gif de apresentação" src=""/>
</div>

</details>

### 👨‍💻 Ações do usuário:

-   Filtrar pacientes.

-   Cadastrar Pacientes.

-   Editar Pacientes.

## ⏯️ Demonstração

<div align="center">
    <img alt="gif de apresentação" src=""/>
</div>

## 👨‍🔧 Habilidades

Neste projeto, foram utilizadas as seguintes habilidades:

-   Utilizado `React`

-   Utilizado os ciclos de vida de um componente React;

-   Utilizado `Hook useEffect` para lidar com efeitos, neste projeto foi utilizado como componentDidUpdate, atualizando a cada transação realizada.

-   Utilizar `Hook useState` para lidar com mudanças de estado da aplicação;

-   Utilizar as funcionalidade `setItem e getItem` do localStorage, para adicionar, recuperar ou excluir dados localmente.

-   Utilizado a biblioteca externa `Chakra-ui` para implementação estilizada da estrutura do projeto.

-   Utilizado a biblioteca externa `sweetalert2` para gerar alertar personalizados quando alguma informação está incorreta.

## 👨‍💻 Rodando o projeto localmente

Clone o projeto

```bash
  git clone git@github.com:Mathluiz23/clinica-ACME.git
```

Entre no diretório do projeto

```bash
  cd clinica-ACME
```

Instale as dependências

```bash
  npm install
```

Entre no diretório do projeto

```bash
  cd frontend
```

Inicie o projeto,

```bash
  npm start
```
