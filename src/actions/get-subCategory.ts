const apiUrl = `https://themountingking.com/backend/api/subcategories`;
const getSubCategory = async (id: string) => {
   const response = await fetch(`${apiUrl}/${id}`);
   return response.json();
};

export default getSubCategory;