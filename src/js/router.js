import { createForm } from './form';
import { createHeader } from './header';

const template = () => document.createElement('div');
const a = () => document.createElement('h1');

export const routes = [
  { path: 'inicio', name: 'Inicio', content: template() },
  { path: 'registrar', name: 'Registrar', content: createForm() },
  { path: 'consulta', name: 'Consultar archivo', content: template() },
];

export const onRouteChange = (path, content) => {
  const root = document.querySelector('#root');
  window.history.pushState({}, '', `/${path}`);
  root.innerHTML = '';
  root.appendChild(createHeader());
  root.appendChild(content);
};
