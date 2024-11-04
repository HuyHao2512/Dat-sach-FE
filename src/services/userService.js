import axios from "axios";
export const login = async (data) => {
  const res = await axios.post("http://localhost:8080/api/auth/signin/", data);
  return res;
};
export const register = async (data) => {
  const res = await axios.post("http://localhost:8080/api/auth/signup/", data);
  return res;
};
export const logout = async ({ token }) => {
  const res = await axios.post("http://localhost:8080/api/auth/logout/", {
    token,
  });
  return res.data;
};
export const addToCart = async ({ bookId, quantity, userId }) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    "http://localhost:8080/api/cart/addtocart",
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
  const token = localStorage.getItem("access_token");
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
  const token = localStorage.getItem("access_token");
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
export const deleteItemInCart = async ({ userId, bookId }) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(
    `http://localhost:8080/api/cart/removecart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        bookId,
        userId,
      },
    }
  );
  return response;
};
export const createOrder = async (data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    "http://localhost:8080/api/order/createorder",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const removeUserCart = async ({ userId }) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    "http://localhost:8080/api/cart/removecart",
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const getOrderByUser = async (userId) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(
    `http://localhost:8080/api/order/getorderbyuser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
