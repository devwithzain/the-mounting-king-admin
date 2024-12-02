const apiUrl = `${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`;
const getProducts = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getProducts;