const apiUrl = `${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/categories`;

const getCategories = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getCategories;