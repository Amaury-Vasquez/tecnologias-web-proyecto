import '../scss/style.scss';
import { routes } from './router';
import { createHomePage } from './home';
import { createHeader } from './header';

try {
  const root = document.querySelector('#root');
  const { pathname } = window.location;
  const path = pathname.split('/')[1];
  const index = routes.findIndex((route) => route.path === path);
  root.appendChild(createHeader());
  if (index >= 0) root.appendChild(routes[index].content);
} catch (e) {
  console.error(e);
}
