import employees, { find } from './emp_data.json';
function getAll({ id, fname, lname, email, gender, ipAddress }) {
    return new Promise((resolve) => {
        let data = employees;
        if (id) {
            data = data.filter((item) => item.id === Number(id));
        }
        if (fname) {
            data = data.filter((item) => item.first_name === fname);
        }
        if (lname) {
            data = data.filter((item) => item.last_name === lname);
        }
        if (email) {
            data = data.filter((item) => item.email === email);
        }
        if (gender) {
            data = data.filter((item) => item.gender === gender);
        }
        if (ipAddress) {
            data = data.filter((item) => item.ip_address === ipAddress);
        }
        resolve({ code: 200, data: JSON.stringify(data) });
    });
}
function getById(employeeId) {
    return new Promise((resolve) => {
        const employee = find((item) => item.id === Number(employeeId));
        if (employee) {
            resolve({ code: 200, data: JSON.stringify(employee) });
        } else {
            resolve({
                code: 404,
                data: { message: `No Employee found for id ${id}` },
            });
        }
    });
}
export default {
    getAll,
    getById
}