import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderDetailPage from "../pages/OrderPage/OrderDetailPage";
import CartPage from "../pages/CartPage/CartPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CategoryPage from "../pages/AdminPage/CategoryPage";
import OrderPageAdmin from "../pages/AdminPage/OrderPageAdmin";
import LayoutComponent from "../components/LayoutComponent/LayoutComponent";
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
    path: "/user/:id",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/orderdetail/:id",
    page: OrderDetailPage,
    isShowHeader: true,
  },
  {
    path: "/admin",
    page: LayoutComponent,
    isShowHeader: false,
    children: [
      {
        path: "dashboard",
        page: AdminPage,
      },
      {
        path: "category",
        page: CategoryPage,
      },
      {
        path: "order",
        page: OrderPageAdmin,
      },
    ],
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
