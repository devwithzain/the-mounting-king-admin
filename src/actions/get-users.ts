const apiUrl = `http://127.0.0.1:8000/api/getAllUsers`;

const getUsers = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getUsers;