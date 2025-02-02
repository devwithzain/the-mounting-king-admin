import axios from 'axios';
export const getUserData = async (token: string | undefined | null) => {
   try {
      const response = await axios.get(`http://127.0.0.1:8000/api/profile`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data.data;
   } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
   }
};