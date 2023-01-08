import { onRouteChange, routes } from './router';
import {
  DeleteFilled,
  StopOutlined,
  SaveOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
} from '@ant-design/icons-svg';
import { createActionButton, appendActionButtons } from './buttons';

function createScreen(id, innerHTML) {
  const root = document.querySelector('#root');
  const successScreen = document.createElement('div');
  successScreen.classList.add('blackScreen');
  successScreen.setAttribute('id', id);
  successScreen.innerHTML = innerHTML;
  root.appendChild(successScreen);
  return successScreen;
}

export function generateWarningScreen(onConfirm) {
  const innerHTML = `
    <div class="confirmModal">
      <div class="confirmModalHeader d-flex justify-content-center">
        <h5 class="modal-title">
          ¿Estás seguro?
        </h5>
      </div>
      <div class="warningDialog d-flex justify-content-center border-bottom">
        <span> Se borrarán todos los datos ingresados </span>
      </div>
      <div class="row actionButtonsContainer" id="actionButtons" >
      </div>
    </div>
  `;
  const warningScreen = createScreen('warningScreen', innerHTML);

  // Funciones y elementos para gestionar respuesta del usuario
  const closeScreen = () => warningScreen.remove();

  const confirmButton = createActionButton(
    'Borrar',
    'danger',
    () => {
      onConfirm();
      closeScreen();
    },
    DeleteFilled
  );
  const cancelButton = createActionButton(
    'Cancelar',
    'light',
    closeScreen,
    StopOutlined
  );

  // Agregar botones a la pantalla de confirmacion
  const actionButtonsContainer = warningScreen.querySelector('#actionButtons');
  appendActionButtons(actionButtonsContainer, [confirmButton, cancelButton]);
}

export function generateSuccessScreen(succeed) {
  const innerHTML = `
      <div class="confirmModal">
        <div class="confirmModalHeader d-flex justify-content-center">
          <h5 class="modal-title ${!succeed && 'text-danger'}">
          ${
            succeed
              ? 'Tus datos fueron enviados!'
              : 'Hubo un problema para enviar tu informacion'
          }</h5>
        </div>
        ${
          !succeed
            ? `
             <div class="confirmDialog border-bottom">
              <span>
                Intenta nuevamente
              </span>
            </div>
          `
            : ''
        } 
        <div class="row actionButtonsContainer" id="actionButtons" >
        </div>
      </div>
  `;
  const successScreen = createScreen('successScreen', innerHTML);

  const viewFileButton = createActionButton(
    'Consultar archivo',
    'primary',
    () => {
      window.location.assign('/consulta');
      // onRouteChange('consultar', routes[2].content);
    },
    FilePdfOutlined
  );
  const closeScreenButton = createActionButton(
    'Modificar datos',
    'light',
    () => successScreen.remove(),
    CheckCircleOutlined
  );
  appendActionButtons(successScreen.querySelector('#actionButtons'), [
    viewFileButton,
    closeScreenButton,
  ]);
}

export function generateConfirmScreen(onConfirm, data) {
  const sections = Object.keys(data);
  const fields = sections.map((key) => {
    const values = data[key];
    const fields = Object.keys(values).map((key) => ({
      key,
      text: values[key],
    }));
    return fields;
  });
  const innerHTML = `
    <div class="dataModal">
      <h2 class="modalTitle"> Verifica tus datos </h2>
      <div class="dataArticles">
        ${fields
          .map(
            (field, i) => `
            <article class="dataSection">
              <h3> ${sections[i]} </h3>
              ${field
                .map(
                  (item) => `
                  <span> ${
                    item.key.charAt(0).toLocaleUpperCase() + item.key.slice(1)
                  }: ${item.text} </span>
                `
                )
                .join('')}
            </article>
          `
          )
          .join('')}
      </div>
      <div class="row actionButtonsContainer" id="actionButtons">
      </div>
    </div>
  `;
  const confirmScreen = createScreen('confirmScreen', innerHTML);
  confirmScreen.querySelector('#actionButtons');
  const confirmButton = createActionButton(
    'Enviar datos',
    'primary',
    () => {
      confirmScreen.remove();
      onConfirm();
    },
    SaveOutlined
  );
  const cancelButton = createActionButton(
    'Cancelar',
    'light',
    () => confirmScreen.remove(),
    StopOutlined
  );
  appendActionButtons(confirmScreen.querySelector('#actionButtons'), [
    confirmButton,
    cancelButton,
  ]);
}
