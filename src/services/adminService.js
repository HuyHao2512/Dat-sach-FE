import axios from "axios";
//category
export const getAllCategories = async () => {
  const response = await axios.get(
    "http://localhost:8080/api/category/getallcategories"
  );
  return response;
};
export const createCategory = async (data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    "http://localhost:8080/api/category/createcategory",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const editCategory = async (id, data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.put(
    `http://localhost:8080/api/category/updatecategory/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data; // Chỉ trả về data từ response
};
export const deleteCategory = async (id) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(
    `http://localhost:8080/api/category/deletecategory/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const createBook = async (data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    "http://localhost:8080/api/book/createbook",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const editBook = async (id, data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.put(
    `http://localhost:8080/api/book/updatebook/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const deleteBook = async (id) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.delete(
    `http://localhost:8080/api/book/deletebook/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
export const getAllOrders = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(
    "http://localhost:8080/api/order/getallorders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const updateOrder = async (id, data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.put(
    `http://localhost:8080/api/order/updateorder/${id}`, // Đảm bảo ID là chuỗi hợp lệ
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
