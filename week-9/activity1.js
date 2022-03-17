function loadData(path) {
    return new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ({ target }) => {
            if (target.readyState == 4 && target.status == 200) {
                resolve(JSON.parse(target.response));
            }
        };
        xhttp.open("GET", path, true);
        xhttp.send();
    });
}
function renderTable(data, term) {
    const tableBody = document.getElementById("table");

    if (!tableBody) {
        throw new Error("No table element found");
    }
    let source = data;
    if (term) {
      const valueTerm = document.getElementById('input').value.toLowerCase();
        switch (term) {
            case 'fname':
                source = source.filter(({ first_name }) => first_name.toLowerCase().includes(valueTerm));
                break;
            case 'lname':
                source = source.filter(({ last_name }) => last_name.toLowerCase().includes(valueTerm));
                break;
            case 'email':
                source = source.filter(({ email }) => email.toLowerCase() === valueTerm);
                break;
            case 'sex':
                source = source.filter(({ sex }) => sex.toLowerCase() === valueTerm);
                break;
            case 'ip_address':
                source = source.filter(({ ip_address }) => ip_address.toLowerCase().includes(valueTerm));
                break;
            default:
                console.log('Default occured');
                break;
        }

    }

    const rows = source.reduce(
        (acc, { id, first_name, last_name, email, sex, ip_address }) => acc +
            `<tr>
        <td>${id}</td>
        <td>${first_name}</td>
        <td>${last_name}</td>
        <td>${email}</td>
        <td>${sex}</td>
        <td>${ip_address}</td>
    </tr>`,
        );
    tableBody.innerHTML = rows;
}
loadData(`./data.json`).then((data) => renderTable(data));
 function onSubmit(event) {
    event.preventDefault();

    const term = event.target.filters.value;

    loadData(`./data.json`).then((data) => renderTable(data, term));
}
function onReset() {
    loadData(`./data.json`).then((data) => renderTable(data));
}