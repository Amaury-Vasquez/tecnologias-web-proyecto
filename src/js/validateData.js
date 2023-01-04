import Joi from 'joi';

const regexBoleta = /PE[0-9]{8}|[0-9]{10}/;
const regexCP = /[0-9]{5}/;
const regexCurp = /[A-Z]{4}[0-9]{6}[A-Z]{6}([A-Z]|[0-9]){2}/;
const regexFecha = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const regexPromedio = /[0-9]\.[0-9]/;
const regexTelefono = /[0-9]{10}/;

const formSchema = Joi.object({
  boleta: Joi.string().regex(regexBoleta).required(),
  curp: Joi.string().regex(regexCurp).required(),
  apellidoPaterno: Joi.string().required(),
  apellidoMaterno: Joi.string().required(),
  nombre: Joi.string().required(),
  fechaNacimiento: Joi.string().regex(regexFecha).required(),
  genero: Joi.string().required(),
  calle: Joi.string().required(),
  colonia: Joi.string().required(),
  alcaldia: Joi.string().required(),
  telefono: Joi.string().regex(regexTelefono).required(),
  cp: Joi.string().regex(regexCP).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  escuela: Joi.string().required(),
  estado: Joi.string().required(),
  promedio: Joi.string().regex(regexPromedio).required(),
  prioridad: Joi.string().required(),
});

function createErrorMessage(message) {
  if (message.includes('pattern')) {
    return 'Formato incorrecto';
  }
  if (message.includes('empty')) {
    return 'Este campo es obligatorio';
  }
  return 'Formato incorrecto';
}

function handleErrors(details) {
  details.forEach((detail) => {
    const { path, message } = detail;

    const key = path[0];
    if (key === 'prioridad' || key === 'genero') {
      return;
    } else if (key === 'escuela' || key === 'estado' || key === 'alcaldia') {
      return;
    } else {
      const input = document.querySelector(`#${key}`);
      const messageId = `error-message-${key}`;
      if (!document.getElementById(messageId)) {
        const errorMessage = document.createElement('label');
        errorMessage.setAttribute('id', messageId);
        errorMessage.classList.add('text-danger', 'fw-bold');
        errorMessage.textContent = '*' + createErrorMessage(message);
        input.after(errorMessage);
        const onInputClick = () => {
          errorMessage && errorMessage.remove();
          const selectedInput = document.getElementById(key);
          selectedInput.removeEventListener('focus', onInputClick);
        };
        input.addEventListener('focus', onInputClick);
      }
    }
  });
}

export function validateData(data) {
  const validate = formSchema.validate(data, { abortEarly: false });
  const { error } = validate;
  if (error) {
    console.error(error);
    const { details } = validate.error;
    handleErrors(details);
    return false;
  }
  return true;
}
