import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;

          if (route.children) {
            return (
              <Route key={route.path} path={route.path} element={<Page />}>
                {route.children.map((childRoute) => {
                  const ChildPage = childRoute.page;
                  return (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={<ChildPage />}
                    />
                  );
                })}
              </Route>
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
