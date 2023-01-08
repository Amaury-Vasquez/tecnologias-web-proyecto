import Joi from 'joi';

const regexBoleta = /(PE|PP)[0-9]{8}|[0-9]{10}/;
const regexCP = /[0-9]{5}/;
const regexCurp = /[A-Z]{4}[0-9]{6}[A-Z]{6}([A-Z]|[0-9]){2}/;
const regexFecha = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const regexPromedio = /[0-9]\.[0-9]/;
const regexTelefono = /[0-9]{10}/;

const identidadSchema = Joi.object({
  boleta: Joi.string().regex(regexBoleta).required(),
  curp: Joi.string().regex(regexCurp).required(),
  apellidoPaterno: Joi.string().required(),
  apellidoMaterno: Joi.string().required(),
  nombre: Joi.string().required(),
  fechaNacimiento: Joi.string().regex(regexFecha).required(),
  genero: Joi.string().required(),
});

const contactoSchema = Joi.object({
  calle: Joi.string().required(),
  colonia: Joi.string().required(),
  alcaldia: Joi.string().required(),
  telefono: Joi.string().regex(regexTelefono).required(),
  cp: Joi.string().regex(regexCP).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const procedenciaSchema = Joi.object({
  escuela: Joi.string().required(),
  estado: Joi.string().required(),
  promedio: Joi.string().regex(regexPromedio).required(),
  prioridad: Joi.string().required(),
});

const consultaSchema = Joi.object({
  boleta: Joi.string().regex(regexBoleta).required(),
  curp: Joi.string().regex(regexCurp).required(),
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

function createErrorLabel(id, message) {
  const label = document.createElement('label');
  label.setAttribute('id', id);
  label.classList.add('text-danger', 'fw-bold');
  label.textContent = `*${createErrorMessage(message)}`;
  return label;
}

function handleErrors(details) {
  details.forEach((detail) => {
    const { path, message } = detail;
    const key = path[0];
    const messageId = `error-message-${key}`;

    if (key === 'estado' || key === 'prioridad' || key === 'genero') {
      return;
    } else {
      const input = document.querySelector(`#${key}`);
      if (!document.getElementById(messageId)) {
        const errorMessage = createErrorLabel(messageId, message);
        input.after(errorMessage);
        const onInputClick = () => {
          errorMessage && errorMessage.remove(); // const error
          const selectedInput = document.getElementById(key);
          selectedInput.removeEventListener('focus', onInputClick);
        };
        input.addEventListener('focus', onInputClick);
      }
    }
  });
}

export function validateData(data) {
  const { identidad, contacto, procedencia } = data;
  const validations = [];
  validations.push(identidadSchema.validate(identidad, { abortEarly: false }));
  validations.push(contactoSchema.validate(contacto, { abortEarly: false }));
  validations.push(
    procedenciaSchema.validate(procedencia, { abortEarly: false })
  );
  let errorExists = false;

  validations.forEach((validation) => {
    const { error } = validation;
    if (error) {
      console.error(error);
      const { details } = validation.error;
      handleErrors(details);
      errorExists = true;
    }
  });
  return !errorExists;
}

export function validateConsulta(data) {
  const validate = consultaSchema.validate(data, { abortEarly: false });
  const { error } = validate;
  if (error) {
    console.error(error);
    const { details } = validate.error;
    handleErrors(details);
    return false;
  }
  return true;
}
