import '../scss/style.scss';
import { createForm } from './form';
import { createHeader } from './header';

const root = document.querySelector('#root');
root.appendChild(createHeader());
root.appendChild(createForm());
