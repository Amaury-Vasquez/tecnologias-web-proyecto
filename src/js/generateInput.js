export function createTextInput(
  id,
  label,
  placeholder,
  className,
  type = 'text' | 'email' | 'date'
) {
  return `
    <div class="${className}">
      <label for="${id}" class="form-label"> ${label} </label>
      <input type="${type}" class="form-control ${type}" id="${id}" placeholder="${placeholder}">
    </div>
  `;
}

export function selectListener(e) {
  const { target } = e;
  const { value } = target;
  const { id } = target;
  if (value === 'Otro') {
    const parent = document.getElementById(`${id}parent`);
    const input = createTextInput(
      id,
      `Ingrese nombre de ${id}`,
      'Insituto Carlos Gracida',
      'col',
      'text'
    );
    const inputParent = document.createElement('div');
    inputParent.setAttribute('id', `input${id}parent`);
    inputParent.innerHTML = input;
    parent && parent.append(inputParent);
  } else {
    const container = document.getElementById(`input${id}parent`);
    container && container.remove();
  }
}

export function createSelectInput(id, label, options = []) {
  return `
    <div class="col" id="${id}parent">
      <label for="${id}" class="form-label">${label}</label>
      <select class="form-select" id="${id}" aria-label="${label}">
        ${options
          .map(
            (option) => `
          <option value="${option}">${option}</option>
        `
          )
          .join('')}
      </select>
    </div>
  `;
}

export function createRadioInputs(id, label, options = []) {
  return `
    <div class="row" id="radio-input-${id}">
      <label class="form-label text-center"> ${label} </label>
      <div class="btn-group" role="group" aria-label="${label}">
        ${options
          .map(
            (option, i) => `
          <input type="radio" class="btn-check" ${
            i === 0 ? 'checked' : ''
          }  name="${id}" id="${option}" autocomplete="off" />
          <label class="btn btn-outline-primary" for="${option}">${option}</label>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}
