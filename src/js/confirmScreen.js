import {
  DeleteFilled,
  StopOutlined,
  SaveOutlined,
} from '@ant-design/icons-svg';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

function createActionButton(text, type, action, icon) {
  const button = document.createElement('button');
  button.addEventListener('click', action);
  button.classList.add('col', 'btn', `btn-${type}`);
  button.innerHTML = `
      ${text}
      ${renderIconDefinitionToSVGElement(icon, {
        extraSVGAttrs: {
          fill: 'inherit',
          width: '1em',
          height: '1em',
        },
      })}
  `;
  return button;
}

export function generateConfirmScreen(onConfirm, warning = false) {
  const confirmScreen = document.createElement('div');
  confirmScreen.innerHTML = `
    <div class="blackScreen" id="confirmScreen">
      <div class="confirmModal">
        <div class="confirmModalHeader">
          <h5 class="modal-title">${
            warning ? '¿Estás seguro?' : 'Guardar datos'
          }</h5>
        </div>
        <div class="${
          warning ? 'warningDialog' : 'confirmDialog'
        } border-bottom">
          <span> ${
            warning
              ? 'Se borrarán todos los datos ingresados'
              : 'Se guardaran tus datos almacenados'
          } </span>
        </div>
        <div class="row actionButtonsContainer" id="actionButtons" >
        </div>
      </div>
    </div>
  `;

  const closeScreen = () =>
    document.querySelector('#root').removeChild(confirmScreen);
  const confirmButton = createActionButton(
    warning ? 'Borrar' : 'Guardar',
    warning ? 'danger' : 'primary',
    () => {
      onConfirm();
      closeScreen();
    },
    warning ? DeleteFilled : SaveOutlined
  );
  const cancelButton = createActionButton(
    'Cancelar',
    'light',
    closeScreen,
    StopOutlined
  );
  const actionButtonsContainer = confirmScreen.querySelector('#actionButtons');
  actionButtonsContainer.appendChild(confirmButton);
  actionButtonsContainer.appendChild(cancelButton);
  document.querySelector('#root').appendChild(confirmScreen);
}
