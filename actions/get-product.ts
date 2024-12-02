const apiUrl = `${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`;
const getProduct = async (id: string) => {
   const response = await fetch(`${apiUrl}/${id}`);
   return response.json();
};

export default getProduct;