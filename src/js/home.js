import LogoEscom from '../../public/escom.png';
import { addRouteClickEvent } from './router';

export function createHomePage() {
  const home = document.createElement('div');
  home.setAttribute('id', 'homePage');
  home.classList.add('page');
  home.innerHTML = `
    <article class="border">
      <h1> Instituto Politécnico Nacional </h1>
      <figure class="figure">
        <img class="figure-img img-fluid rounded" src="${LogoEscom}" alt="Logo ESCOM IPN"/>
        <figcaption class="figure-caption"> ESCOM IPN</figcaption>
      </figure>
      <p> La Escuela Superior de Cómputo fue fundada el 13 de agosto de 1993 y ofrece las carreras de ISC, IIA y LCD. </p>
      <h2> Misión </h2>
      <p>
        La Escuela Superior de Cómputo es una Unidad Académica líder en la formación de profesionales integrales en las 
        áreas de Sistemas Computacionales, Inteligencia Artificial y Ciencia de Datos, con amplio sentido social, 
        contribuyendo al desarrollo tecnológico, científico y económico del país, coadyuvando a la sustentabilidad y 
        observando estándares internacionales de calidad educativa.
      </p>
      <h2> Visión </h2>
      <p>
        La Escuela Superior de Cómputo será líder en Latinoamérica en la formación integral de profesionales en el área de la computación, 
        con estándares internacionales de calidad educativa, promoviendo la responsabilidad en sus alumnos para con su entorno, el sentido 
        social y el respeto a la pluralidad. Propiciando la innovación y el emprendimiento para contribuir al desarrollo económico y tecnológico del país.
      </p>
      <h2> Politica de calidad </h2>
      <p>
        Nuestro compromiso es asegurar servicios educativos de calidad, mediante la oferta de programas académicos pertinentes, que logren la satisfacción 
        de las y los alumnos, en su formación integral como profesionistas competentes, para contribuir al desarrollo científico, tecnológico, cultural y 
        socioeconómico del país; sustentado en el cumplimiento de los requisitos normativos aplicables y en el mantenimiento de la mejora continua del SGC.
      </p>
      <div class="col margin-top">
        <a class="btn btn-primary" id="link_registro" > Registra tus datos </a>
      </div>
      <div class="col">
        <a class="btn btn-light" href="https://www.escom.ipn.mx/" target="_blank"> Conoce más </a>
      </div>
    </article>
  `;
  const linkRegistro = home.querySelector('#link_registro');
  addRouteClickEvent(linkRegistro, 'registrar');

  return home;
}
