import { sendData } from './requests';
import { validateData } from './validateData';
import { ClearOutlined, SendOutlined } from '@ant-design/icons-svg';
import { alcaldias, escuelas, estados, prioridad } from './formValues';
import {
  generateWarningScreen,
  generateSuccessScreen,
  generateConfirmScreen,
} from './screens';
import {
  createTextInput,
  createRadioInputs,
  createSelectInput,
  selectListener,
} from './generateInput';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

export function getRadioValue(container, name) {
  const radios = container.querySelectorAll(`input[name="${name}"]`);
  const option = Array.from(radios).find((radio) => radio.checked);
  return option ? option.id : null;
}

const getFormData = (event) => {
  if (event) event.preventDefault();
  function getData() {
    const form = document.getElementById('formulario');
    // Recolecta la informacion de las secciones del formulario
    function getSectionData(sectionId) {
      const section = form.querySelector(`#${sectionId}`);
      const inputs = section.querySelectorAll(
        'input[type="text"], input[type="date"], input[type="email"], input[type="tel"]'
      );
      const data = {};
      inputs.forEach((input) => (data[input.id] = input.value));
      const setRadioValue = (name) => {
        const option = getRadioValue(section, name);
        if (option) data[name] = option;
      };
      setRadioValue('genero');
      setRadioValue('prioridad');
      const setSelectValue = (name) => {
        const select = section.querySelector(`select[id="${name}"]`);
        if (select && select.value !== 'Otro') data[name] = select.value;
      };
      setSelectValue('estado');
      setSelectValue('escuela');
      setSelectValue('alcaldia');
      return data;
    }

    const formData = {
      identidad: getSectionData('identidad'),
      contacto: getSectionData('contacto'),
      procedencia: getSectionData('procedencia'),
    };
    return formData;
  }
  const formData = getData();
  if (validateData(formData)) {
    const onConfirm = async () => {
      const succeed = await sendData(formData);
      generateSuccessScreen(succeed);
      if (succeed) {
        const { identidad } = formData;
        const { boleta, curp } = identidad;
        const name = `${identidad.nombre} ${identidad.apellidoPaterno} ${identidad.apellidoMaterno}`;
        sessionStorage.setItem('user', JSON.stringify({ boleta, curp, name }));
      }
    };
    generateConfirmScreen(onConfirm, formData);
  }
};

const confirmReset = (event) => {
  event.preventDefault();
  const reset = () => {
    const form = document.getElementById('formulario');
    form
      .querySelectorAll(
        'input[type="text"], input[type="email"], input[type="tel"], input[type="date"]'
      )
      .forEach((input) => (input.value = ''));
    const selects = form.querySelectorAll('select');
    selects.forEach((select) => {
      select.value = select.getElementsByTagName('option')[0].value;
      const input = form.querySelector(`#input${select.id}parent`);
      input && input.remove();
    });
    const labels = form.querySelectorAll('label');
    labels.forEach((label) => {
      if (label.classList.contains('text-danger')) label.remove();
    });
  };
  generateWarningScreen(reset);
};

function createForm() {
  const form = document.createElement('form');
  const genders = ['Masculino', 'Femenino', 'Otro'];
  form.classList.add('form');
  form.classList.add('border');
  form.setAttribute('id', 'formulario');
  form.innerHTML = `
    <fieldset class="form-group p-3" id="identidad">
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
    <fieldset class="form-group p-3" id="contacto">
      <legend class="w-fill"> Datos de contacto </legend>
      ${createTextInput('calle', 'Calle', 'Calle 1', 'col', 'text')}
      ${createTextInput('colonia', 'Colonia', 'Colonia 1', 'col', 'text')}
      ${createSelectInput('alcaldia', 'Alcaldía', alcaldias)}
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
    <fieldset class="form-group p-3" id="procedencia">
      <legend class="w-fill"> Datos de procedencia </legend>
        ${createSelectInput('escuela', 'Escuela de procedencia', escuelas)}
      <div class="row">
        ${createSelectInput('estado', 'Estado de procedencia', estados)}
        ${createTextInput('promedio', 'Promedio', '7.0', 'col', 'text')}
      </div>
      ${createRadioInputs('prioridad', 'Escom fue tu', prioridad)}
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

export function createFormPage() {
  const formPage = document.createElement('div');
  formPage.classList.add('page');
  const form = createForm();
  formPage.appendChild(form);
  const selects = ['alcaldia', 'escuela'];
  selects.forEach((id) => {
    const input = form.querySelector(`select[id="${id}"]`);
    input.addEventListener('change', selectListener);
  });
  return formPage;
}
