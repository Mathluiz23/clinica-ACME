import "./errorMessage.css";

const FormErrorMessage = ({ errors, fieldName }) => {
	return (
		<p className="error-message">
			{errors[fieldName] && errors[fieldName]}
		</p>
	);
};

export default FormErrorMessage;
