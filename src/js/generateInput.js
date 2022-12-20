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
export function createSelectInput(id, label, options = []) {
  return `
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
  `;
}

export function createRadioInputs(id, label, options = []) {
  return `
    <div class="row">
      <label class="form-label text-center"> ${label} </label>
      <div class="btn-group" role="group" aria-label="${label}">
        ${options
          .map(
            (option) => `
          <input type="radio" class="btn-check" name="${id}" id="${option}" autocomplete="off" />
          <label class="btn btn-outline-primary" for="${option}">${option}</label>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}
