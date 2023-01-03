import { createFormPage } from './form';
import { createHeader } from './header';
import { createHomePage } from './home';

export const routes = [
  { path: 'inicio', name: 'Inicio', content: createHomePage() },
  { path: 'registrar', name: 'Registrar', content: createFormPage() },
  { path: 'consulta', name: 'Consultar archivo', content: createHomePage() },
];

export const onRouteChange = (path, content) => {
  const root = document.querySelector('#root');
  window.history.pushState({}, '', `/${path}`);
  root.innerHTML = '';
  root.appendChild(createHeader());
  root.appendChild(content);
};

export function addRouteClickEvent(element, path) {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const index = routes.findIndex((route) => route.path === path);
    onRouteChange(path, routes[index].content);
  });
}
