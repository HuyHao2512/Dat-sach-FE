import axios from "axios";
const token = localStorage.getItem("access_token");
export const login = async (data) => {
  const res = await axios.post("http://localhost:8080/api/auth/signin/", data);
  return res;
};
export const addToCart = async ({ bookId, quantity, userId }) => {
  const response = await axios.post(
    "http://localhost:8080/api/cart/cart",
    {
      bookId,
      quantity,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token để xác thực
      },
    }
  );
  return response;
};
export const getCart = async (userId) => {
  const response = await axios.get(
    `http://localhost:8080/api/cart/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const updateItemInCart = async ({ userId, bookId, quantity }) => {
  const response = await axios.put(
    `http://localhost:8080/api/cart/user/${userId}`,
    {
      userId,
      bookId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
