const apiUrl = `https://themountingking.com/backend/api/users`;

const getUsers = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getUsers;