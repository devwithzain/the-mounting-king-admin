const apiUrl = `http://127.0.0.1:8000/api/employees`;

const getEmployees = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getEmployees;