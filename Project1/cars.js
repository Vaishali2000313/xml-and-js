const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); 
  template.innerHTML = html;
  return template.content.firstChild;
};

const loadData = (path, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = ({ target }) => {
    if (target.readyState == 4 && target.status == 200) {
      callback(target.responseXML);
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
};

const xmlToJson = (xmlData) => {
  let MyTableData =[]
  const table = document.getElementById("MyTable");

  if (!table){
    throw new Error ("Table not found !")
  }
  const nodes = Array.from(xmlData.documentElement.childNodes).filter(
    ({ nodeName }) => nodeName === `Car`
  );
  nodes.map((item) => {
    let id = item.attributes[0].textContent;
    let carName = Array.from(item.getElementsByTagName(`Name`))[0].textContent;
    let founded = Array.from(item.getElementsByTagName(`Founded`))[0].textContent;
    let country = Array.from(item.getElementsByTagName(`Country`))[0].textContent;
    let availability = item.attributes[1].textContent
    let price = Array.from(item.getElementsByTagName(`StartingPrice`))[0].textContent;

    //pushing the above content in the MyTableData array.
    MyTableData.push({id, carName, founded, country, availability, price })
  });
  renderTable(MyTableData)
};


const renderTable = (xmlData) => {
  const table = document.getElementById("MyTable");

  if (!table) {
    throw new Error("Table not found !");
  }
  if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const searchWord = params.get(`TextBox`).toLowerCase();
    document.getElementById(`searchWord`).value = searchWord;
    xmlData = data.filter(
      ({id, carName ,founded, country, availability,price}) =>
      id.toLowerCase().includes(searchWord)||
      carName.toLowerCase().includes(searchWord)||
      founded.toLowerCase().includes(searchWord)||
      country.toLowerCase().includes(searchWord)||
      availability.toLowerCase().includes(searchWord)||
      price.toLowerCase().includes(searchWord)
      
    );
    const countryFilter = params.getAll(`country`)
    countryFilter.forEach(filter => {
      const checkbox = document.getElementById(`country`);
      checkbox.checked = true;
    });
  }
  const rows = xmlData.map(
    ({ id, carName, founded,country,availability,price}) => 
      table.appendChild(
        htmlToElement( `<tr id ="table-row-${id}">
      <td>${id}</td>
      <td>${carName}</td>
      <td>${founded}</td>
      <td>${country}</td>
      <td>${availability}</td>
      <td>${price}</td>
      </tr>`
      )
      )
  );
};
const onReset = () => {
  window.location.replace(window.location.pathname);
};

loadData(`http://localhost:8080/cars.xml`, xmlToJson);
renderTable();