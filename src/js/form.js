import { alcaldias, escuelas, estados, prioridad } from './formValues';
import { generateConfirmScreen } from './confirmScreen';
import { ClearOutlined, SendOutlined } from '@ant-design/icons-svg';
import {
  createTextInput,
  createRadioInputs,
  createSelectInput,
} from './generateInput';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

const getFormData = (event) => {
  event.preventDefault();
  function sendData() {
    const form = document.getElementById('formulario');
    const inputIds = [
      'boleta',
      'curp',
      'apellidoPaterno',
      'apellidoMaterno',
      'nombre',
      'fechaNacimiento',
    ];
    const radios = document.querySelectorAll('input[name="genero"]');
    radios.forEach((radio) => console.log(radio.checked, radio.value));
    console.log(form);
    return inputIds.map((id) => {
      const input = form.querySelector(`#${id}`);
      return input.value;
    });
  }
  generateConfirmScreen(sendData);
};

const confirmReset = (event) => {
  event.preventDefault();
  const reset = () => {
    const form = document.getElementById('formulario');
    form
      .querySelectorAll('input[type="text"]')
      .forEach((input) => (input.value = ''));
    form
      .querySelectorAll('input[type="date"]')
      .forEach((input) => (input.value = ''));
    form
      .querySelectorAll('input[type="radio"]')
      .forEach((radio) => (radio.checked = false));
  };
  generateConfirmScreen(reset, true);
};

export function createForm() {
  const form = document.createElement('form');
  const genders = ['Masculino', 'Femenino', 'Otro'];
  form.classList.add('form');
  form.classList.add('border');
  form.setAttribute('id', 'formulario');
  form.innerHTML = `
    <fieldset class="form-group p-3">
      <legend class="w-fill"> Datos de Identidad</legend>
      <div class="row">
        ${createTextInput('boleta', 'No. Boleta', '2021630014', 'col', 'text')}
        ${createTextInput('curp', 'CURP', 'VAEA990601HOCSNM06', 'col', 'text')}
        </div>
        <div class="row">
        ${createTextInput(
          'apellidoPaterno',
          'Apellido paterno',
          'Mata',
          'col',
          'text'
        )}
      ${createTextInput(
        'apellidoMaterno',
        'Apellido materno',
        'Escobar',
        'col',
        'text'
      )}
      </div>
      <div class="row">
      ${createTextInput('nombre', 'Nombre', 'Pablo', 'col', 'text')}
      ${createTextInput(
        'fechaNacimiento',
        'Fecha de nacimiento',
        '',
        'col date',
        'date'
      )}
      </div>
      ${createRadioInputs('genero', 'Género', genders)}
        
      </div>
    </fieldset>
    <fieldset class="form-group p-3">
      <legend class="w-fill" > Datos de contacto </legend>
      ${createTextInput('calle', 'Calle', 'Calle 1', 'col', 'text')}
      ${createTextInput('colonia', 'Colonia', 'Colonia 1', 'col', 'text')}
      <div class="col">
        ${createSelectInput('alcaldia', 'Alcaldía', alcaldias)}
      </div>
      <div class="row">
        ${createTextInput('telefono', 'Teléfono', '1234567890', 'col', 'tel')}
        ${createTextInput('cp', 'Código postal', '12345', 'col', 'text')}
      </div>
        ${createTextInput(
          'email',
          'Correo electrónico',
          'email@example.com',
          'col',
          'email'
        )}

    </fieldset>
    <fieldset class="form-group p-3">
      <legend class="w-fill" > Datos de procedencia </legend>
      <div class="col" id="contenedorescuelas">
        ${createSelectInput('escuela', 'Escuela de procedencia', escuelas)}
      </div>
      <div class="row">
        <div class="col" id="contenedorestados">
        ${createSelectInput('estado', 'Estado de procedencia', estados)}
        </div>
        ${createTextInput('promedio', 'Promedio', '7.0', 'col', 'text')}
      </div>
      ${createRadioInputs('escom', 'Escom fue tu', prioridad)}
    </fieldset>
    <fieldset class="form-group p-3">
      <div class="row actionButtonsContainer">
        <button type="submit" class="btn btn-primary col"> 
          Enviar datos 
          ${renderIconDefinitionToSVGElement(SendOutlined, {
            extraSVGAttrs: { fill: 'white', width: '1em', height: '1em' },
          })}
        </button>
        <button id="resetButton" class="btn btn-danger col" type="reset" > 
          Limpiar datos 
          ${renderIconDefinitionToSVGElement(ClearOutlined, {
            extraSVGAttrs: { fill: 'white', width: '1em', height: '1em' },
          })}
        </button>
      </div>
    </fieldset>
  `;
  form.addEventListener('submit', getFormData);
  form.addEventListener('reset', confirmReset);
  return form;
}
