const apiUrl = `http://127.0.0.1:8000/api/requestServices`;

const getRequestServices = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getRequestServices;