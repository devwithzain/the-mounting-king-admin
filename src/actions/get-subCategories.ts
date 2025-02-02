const apiUrl = `http://127.0.0.1:8000/api/subcategories`;
const getSubCategories = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getSubCategories;