import { consultData } from './requests';
import { createTextInput } from './generateInput';
import { validateConsulta } from './validateData';
import {
  generateLoadingScreen,
  generateConsultScreen,
  generateErrorScreen,
} from './screens';
import {
  createActionButton,
  createButton,
  appendActionButtons,
} from './buttons';
import { FilePdfOutlined } from '@ant-design/icons-svg';

function createConsultForm() {
  const form = document.createElement('form');
  form.classList.add('consultForm');
  form.innerHTML = `
    <h2 class="modalTitle"> 
      Ingresa tus datos para consultar tu archivo
    </h2>
    <div class="row" id="consultInputParent" >
      ${createTextInput('curp', 'CURP', 'VAEA990601HOCSNM06', 'col', 'text')}
    </div>
    <div class="row actionButtonsContainer" id="actionButtons">
    </div>
  `;
  const onConfirm = async (e) => {
    e.preventDefault();
    const curp = document.getElementById('curp').value;
    const isDataValid = validateConsulta({ curp });
    if (isDataValid) {
      const loadingScreen = generateLoadingScreen();
      const data = await consultData(curp).then((res) => {
        loadingScreen.remove();
        return res;
      });
      if (Array.isArray(data)) generateErrorScreen();
      else {
        const name = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`;
        const { laboratorio, fecha_examen, hora } = data;
        sessionStorage.setItem(
          'user',
          JSON.stringify({ curp, name, laboratorio, fecha_examen, hora })
        );
        generateConsultScreen({ name }, () => window.location.reload());
      }
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
  const { name, laboratorio, fecha_examen, hora } = data;
  result.innerHTML = `
    <h2> Asignación de examen diagnóstico </h2>
    <div class="row">
      <div class="col">
        <span> Alumno: ${name} </span>
      </div>
      <div class="col">
        <span> Fecha de realización: ${fecha_examen} </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span> Laboratorio: ${laboratorio} </span>
      </div>
      <div class="col">
        <span> Horario: ${hora} </span>
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
  const { curp } = data;
  downloadButton.setAttribute(
    'href',
    `http://localhost:5000/get_pdf.php?curp=${curp}`
  );
  downloadButton.setAttribute('download', `${name}.pdf`);
  appendActionButtons(result, [downloadButton, consultButton]);
  return result;
}

export function createConsultPage() {
  const page = document.createElement('div');
  page.classList.add('page');
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user) {
    page.appendChild(createConsultResult(user));
  } else {
    page.appendChild(createConsultForm());
  }

  return page;
}
