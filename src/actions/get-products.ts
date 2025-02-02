const apiUrl = `http://127.0.0.1:8000/api/products`;

const getProducts = async () => {
   const response = await fetch(apiUrl);
   return response.json();
};

export default getProducts;