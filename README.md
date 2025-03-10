<h1 align="center">  Clínica ACME :calendar: :pushpin: </h1>

<h2> 🖥️📱 Deploy </h2>

Neste link você tem acesso ao projeto disponibilizado na web.

click aqui: https://clinica-acme.vercel.app/

para logar na aplicação voce pode utilizar os seguintes dados:

    
    email: "joao@interprocess.com",
    password: "1234",

ou

    email: "maria@interprocess.com",
    password: "12345",

<hr>

## 💻 Projeto

Este projeto consiste em uma aplicação de consultar e cadastrar pacientes. Onde será possível:

-   Visualizar os pacientes cadastrados através de uma tabela.
-   Filtrar pacientes por nome, CPF ou status.
-   Cadastrar novos pacientes.
-   Editar o cadastro de um paciente.

<br>
<br>

## ⏯️ Demonstração

<div align="center">
    <img alt="gif de apresentação" src="src/assets/mainPage.gif"/>
</div>

<br>
<hr>

<summary><h3>Login :file_folder: :computer:</h3></summary><br />
  
  ### Na tela de login terá os campos usuário e senha, só será possível entrar na plataforma de o usuário estiver cadastrado no sistema:
- E-mail
- Senha 

Aqui também é possível escolher entre modo claro e escuro para navegação.


<div align="center">
    <img alt="gif de apresentação" src="src/assets/login.png"/>
</div>

<br>
<br>

<summary><h3>Tela Principal :file_folder: :computer:</h3></summary><br />
  
  ### Na tela principal você pode visualizar tabela com todos os pacientes cadastrados, contendo informações resumidas sobre cada um deles com:
- Nome
- CPF
- Status

### Pesquisar pacientes cadastrados, filtrando por nome, CPF e status.

### Botão de cadastrar pacientes, levará para uma página de cadastro.

### Clicando em ver detalhes na linha da tabela de cada paciente, levará para uma página de detahes de cada paciente, contendo todas as informações cadastradas.


<div align="center">
    <img alt="gif de apresentação" src="src/assets/tabela.png"/>
</div>

<br>
<br>

<summary><h3>Tela de Cadastro :man_technologist:</h3></summary><br />
  
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

<div align="center">
    <img alt="gif de apresentação" src="src/assets/cadastro.png"/>
</div>


<br>
<br>

<summary><h3>Tela de Detalhes :open_file_folder: :bookmark_tabs:</h3></summary><br />
  
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

<div align="center">
    <img alt="gif de apresentação" src="src/assets/detalhes.png"/>
</div>


<br>

### 👨‍💻 Ações do usuário:

-   Filtrar pacientes.

-   Cadastrar Pacientes.

-   Editar Pacientes.

<br>

## 👨‍🔧 Habilidades

Neste projeto, foram utilizadas as seguintes habilidades:

-   Utilizado `React`

-   Utilizado componentes funcionais que retorna um elemento do React (JSX).

-   Utilizado os ciclos de vida de um componente React;

-   Utilizado `Context API` para compartilhar dados globais entre componentes.

-   Utilizado `Hook useEffect` para lidar com efeitos. Neste projeto o `useEffect` foi utilizado como `componentDidMount` quando o seu array de dependência é declarado como vazio e em alguns casos utilizado como `componentDidUpdtae` quando é informado algum parâmetro no seu array de dependência, neste caso ele executá-ra toda vez que aquele parâmetro informado for modificado.

-   Utilizar `Hook useState` para lidar com mudanças de estado da aplicação;

-   Utilizar as funcionalidade `setItem e getItem` do localStorage, para adicionar, recuperar ou excluir dados localmente.

-   Utilizado a biblioteca externa `Chakra-ui` para implementação estilizada da estrutura de tabela e formulário implementados no projeto.

-   Utilizado a biblioteca externa `sweetalert2` para gerar alertas personalizados quando alguma informação está incorreta.

<br>
<br>

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

Inicie o projeto,

```bash
  npm start
```
