import { createTextInput } from './generateInput';
import { validateConsulta } from './validateData';
import { generateWarningScreen } from './screens';
import {
  createActionButton,
  createButton,
  appendActionButtons,
} from './buttons';
import { FilePdfOutlined } from '@ant-design/icons-svg';
import img from '../../public/escom.png';

function createConsultForm() {
  const form = document.createElement('form');
  form.classList.add('consultForm');
  form.innerHTML = `
    <h2 class="modalTitle"> 
      Ingresa tus datos para consultar tu archivo
    </h2>
    ${createTextInput('boleta', 'No. Boleta', '2021630014', 'col', 'text')}
    ${createTextInput('curp', 'CURP', 'VAEA990601HOCSNM06', 'col', 'text')}
    <div class="row actionButtonsContainer" id="actionButtons">
    </div>
  `;
  const onConfirm = (e) => {
    e.preventDefault();
    const boleta = document.getElementById('boleta').value;
    const curp = document.getElementById('curp').value;
    const isDataValid = validateConsulta({ boleta, curp });
    if (isDataValid) {
      console.log('Valid data');
    }
  };
  const submitButton = createActionButton(
    'Consultar',
    'primary',
    onConfirm,
    FilePdfOutlined
  );
  appendActionButtons(form.querySelector('#actionButtons'), [submitButton]);
  return form;
}

function createConsultResult(data) {
  const result = document.createElement('div');
  result.classList.add('consultResult');
  const { name } = data;
  const lab = '1201';
  const fecha = '2021-06-01';
  const horario = '10:00-12:00';
  result.innerHTML = `
    <h2> Asignación de examen diagnóstico </h2>
    <div class="row">
      <div class="col">
        <span> Alumno: ${name} </span>
      </div>
      <div class="col">
        <span> Fecha de realización: ${fecha} </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span> Laboratorio: ${lab} </span>
      </div>
      <div class="col">
        <span> Horario: ${horario} </span>
      </div>
    </div>
  `;
  const downloadButton = createButton(
    'a',
    'Descargar archivo',
    'primary',
    FilePdfOutlined
  );
  const onConsult = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const consultButton = createActionButton(
    'Consultar otro',
    'light',
    onConsult,
    FilePdfOutlined
  );
  downloadButton.setAttribute('href', img);
  downloadButton.setAttribute('download', `${name.replace(' ', '_')}`);
  appendActionButtons(result, [downloadButton, consultButton]);
  return result;
}

export function createConsultPage() {
  const page = document.createElement('div');
  page.classList.add('page');
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log('🖨️ ~ createConsultPage ~ user', user);
  if (user) {
    page.appendChild(createConsultResult(user));
  } else {
    page.appendChild(createConsultForm());
  }

  return page;
}
