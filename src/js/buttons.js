import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';

export function createButton(buttonType, text, style, icon) {
  const button = document.createElement(buttonType);
  button.classList.add('col', 'btn', `btn-${style}`);
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

export function createActionButton(text, styleType, action, icon) {
  const button = createButton('button', text, styleType, icon);
  button.addEventListener('click', action);
  return button;
}

export function appendActionButtons(container, buttons) {
  buttons.forEach((button) => container.appendChild(button));
}
