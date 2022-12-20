import { routes, onRouteChange } from './router';
import { generateConfirmScreen } from './confirmScreen';

export function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
    <nav class="nav justify-content-center">
      ${routes
        .map(
          (route) => `
          <a class="nav-link active" id="${route.path}" href="/${route.path}"> 
            ${route.name} 
          </a>`
        )
        .join('')}
    </nav>
  `;
  routes.forEach(({ path, content }) => {
    const link = header.querySelector(`#${path}`);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const { pathname } = window.location;
      const redirectPath = `/${path}`;
      if (pathname !== redirectPath) {
        if (pathname === '/registrar')
          generateConfirmScreen(() => onRouteChange(path, content), true);
        else onRouteChange(path, content);
      }
    });
  });
  return header;
}
