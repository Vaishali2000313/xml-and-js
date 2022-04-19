import contractors, { find } from "../data/data.json";

function getAllContractors(term, card_type, status, cost_from, cost_to, material_type, valueTerm) {
    return new Promise((resolve) => {
        let data = contractors;

        if (term) {

            switch (term) {
                case "contractor_name":
                    data = data.filter(({ contractor_name }) => contractor_name.toLowerCase().includes(valueTerm));
                    break;
                case "email":
                    data = data.filter(({ email }) => email.toLowerCase().includes(valueTerm));
                    break;
                case "role":
                    data = data.filter(({ role }) => role.toLowerCase().includes(valueTerm));
                    break;
                case "department":
                    data = data.filter(({ department }) => department.toLowerCase().includes(valueTerm));
                    break;
                case "card_number":
                    data = data.filter(({ card_number }) => card_number.includes(valueTerm));
                    break;
                case "construction_code":
                    data = data.filter(({ construction_code }) => construction_code.toLowerCase().includes(valueTerm));
                    break;
                default:

                    break;
            }
        }

        if (status && status != "none") {
            status = (status == "active") ? true : false;
            data = data.filter(({ is_active }) => status === is_active);
        }

        if (card_type && card_type.length > 0) {
            let cards = [];
            card_type.map((card) => {
                cards.push(...data.filter((data) => card == data.card_type));
            });
            data = cards;
        }

        if (cost_from && cost_from != "" && cost_to && cost_to != "") {
            data = data.filter(({ material_rate }) => Number(material_rate.replace("$", "")) >= Number(cost_from) && Number(material_rate.replace("$", "")) <= Number(cost_to));
        }

        if (material_type && material_type != "all") {
            data = data.filter(({ material_name }) => material_name.toLowerCase() === material_type);
        }

        resolve({ data: data });
    });
}

const getContractorById = (contractorId) =>
  new Promise((resolve) => {
    const contractor = find(({id}) => id === Number(contractorId));

    if (contractor) {
        resolve({data: Array(contractor) });
    } else {
        resolve({
            data: { message: `No contractor found for id ${id}` },
        });
    }
  });

export default {
  getAllContractors,
  getContractorById,
};