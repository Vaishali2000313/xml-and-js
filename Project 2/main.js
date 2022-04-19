const { getAllContractors, getContractorById } = require("./api/controller/contractor");

const renderTable = (data) => {
  const tableBody = document.getElementById("table-body");

  if (!tableBody) {
    throw new Error("No table element found");
  }
  
  const rows = data.reduce(
    (acc, { id, contractor_name, email, is_active, department, role, material_name, material_rate, construction_code, card_type, card_number}) =>
      acc +
      `<tr>
        <td>${id}</td>
        <td>${contractor_name}</td>
        <td>${email}</td>
        <td>${is_active}</td>
        <td>${department}</td>
        <td>${role}</td>
        <td>${material_name}</td>
        <td>${material_rate}</td>
        <td>${construction_code}</td>
        <td>${card_type}</td>
        <td>${card_number}</td>
    </tr>`,
    ``
  );

  tableBody.innerHTML = rows;
};

getAllContractors().then(({ data }) => renderTable(data));  

const onSubmit = (event) => {
  event.preventDefault();
  const term = event.target.filters.value;

  const cost_from = event.target.input_cost_from.value;
  const cost_to = event.target.input_cost_to.value;
  const material_type = event.target.filters_material.value;
  const status = event.target.status.value;
  const card_type = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
                      .map(item => item.value);
          
  const valueTerm = event.target.input.value;
  
  if(term === `id`) {
    getContractorById(valueTerm).then(({ data }) => renderTable(data));
  } else {
    getAllContractors(term, card_type, status, cost_from, cost_to, material_type.toLowerCase(), valueTerm.toLowerCase()).then(({ data }) => renderTable(data));
  }
};

const onReset = () => {
  window.location.replace(window.location.pathname);
  getAllContractors().then(({ data }) => renderTable(data));
};

document.getElementById("myForm").addEventListener("submit", onSubmit);
document.getElementById("myForm").addEventListener("reset", onReset);