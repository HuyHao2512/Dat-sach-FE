// eslint-disable-next-line no-unused-vars
import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <br />
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
