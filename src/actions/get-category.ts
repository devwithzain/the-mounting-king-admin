const apiUrl = `http://127.0.0.1:8000/api/categories`;
const getCategory = async (id: string) => {
   const response = await fetch(`${apiUrl}/${id}`);
   return response.json();
};

export default getCategory;