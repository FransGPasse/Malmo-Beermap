import React from "react";
import { Link } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";

const Footer = () => {
  return (
    <>
      <footer className="flex w-full items-center flex-row justify-between px-10 py-5 fixed bottom-0">
        <span>© 2022 BeerMap</span>
        <Link as={Link} to="/adminlogin" className="hover:underline">
          Admin
        </Link>
      </footer>
    </>
  );
};

export default Footer;
