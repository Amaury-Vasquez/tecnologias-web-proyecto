import '../scss/style.scss';
import { createHomePage } from './home';
import { createHeader } from './header';

try {
  const root = document.querySelector('#root');
  root.appendChild(createHeader());
  root.appendChild(createHomePage());
} catch (e) {
  console.error(e);
}
