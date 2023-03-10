import { sendData, sendEmail } from './requests';
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
      formData.identidad['genero'] = formData.identidad['genero'].charAt(0);
      let data = {};
      Object.keys(formData).forEach((key) => {
        Object.keys(formData[key]).forEach((subKey) => {
          data[subKey] = formData[key][subKey];
        });
      });
      const response = await sendData(data);
      generateSuccessScreen(response);
      if (response) {
        const { identidad } = formData;
        const { curp } = identidad;
        const { email } = data;
        const name = `${identidad.nombre} ${identidad.apellidoPaterno} ${identidad.apellidoMaterno}`;
        const { fecha_examen, laboratorio, hora } = response;
        sessionStorage.setItem(
          'user',
          JSON.stringify({ curp, name, fecha_examen, laboratorio, hora })
        );
        await sendEmail({ email, curp, name });
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
      ${createRadioInputs('genero', 'G??nero', genders)}
        
      </div>
    </fieldset>
    <fieldset class="form-group p-3" id="contacto">
      <legend class="w-fill"> Datos de contacto </legend>
      ${createTextInput('calle', 'Calle', 'Calle 1', 'col', 'text')}
      ${createTextInput('colonia', 'Colonia', 'Colonia 1', 'col', 'text')}
      ${createSelectInput('alcaldia', 'Alcald??a', alcaldias)}
      <div class="row">
        ${createTextInput('telefono', 'Tel??fono', '1234567890', 'col', 'tel')}
        ${createTextInput('cp', 'C??digo postal', '12345', 'col', 'text')}
      </div>
        ${createTextInput(
          'email',
          'Correo electr??nico',
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
        <button type="submit" class="btn btn-primary col actionButton"> 
          Enviar datos 
          ${renderIconDefinitionToSVGElement(SendOutlined, {
            extraSVGAttrs: { fill: 'white', width: '1em', height: '1em' },
          })}
        </button>
        <button id="resetButton" class="btn btn-danger col actionButton" type="reset" > 
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
