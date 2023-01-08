import { routes, onRouteChange } from './router';
import { generateWarningScreen } from './screens';

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
    const { pathname } = window.location;

    if (pathname === `/${path}`) link.classList.add('nav-link-active');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const redirectPath = `/${path}`;
      if (pathname !== redirectPath) onRouteChange(path, content);
    });
  });
  return header;
}
