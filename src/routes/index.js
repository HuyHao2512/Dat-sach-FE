import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";
import OrderDetailPage from "../pages/OrderPage/OrderDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CartPage from "../pages/CartPage/CartPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import EditPage from "../pages/AdminPage/EditPage";
import path from "path";
export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/login",
    page: LoginPage,
  },
  {
    path: "/register",
    page: RegisterPage,
  },
  {
    path: "/user/:id",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/orderdetail",
    page: OrderDetailPage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/admin",
    page: AdminPage,
  },
  {
    path: "/admin/edit",
    page: EditPage,
  },
];
