// src/components/Layout.js
import React from 'react';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
