import "./errorMessage.css";

const FormErrorMessage = ({ errors, fieldName }) => {
	console.log(errors);
	console.log(fieldName);
	return (
		<p className="error-message">
			{errors[fieldName] && errors[fieldName]}
		</p>
	);
};

export default FormErrorMessage;
