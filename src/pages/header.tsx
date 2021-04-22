import React from "react";
import nuberLogo from "../images/logo.svg";

export const Header = () => {
  return (
    <header className="bg-red-500 py-4">
      <div className="bg-yellow-500 w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
        im the header
      </div>
    </header>
  );
};
