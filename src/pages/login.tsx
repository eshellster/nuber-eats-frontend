import React from "react";

export const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-50 w-full max-w-lg py-5 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form className="grid gap-3 px-5 mt-5">
          <input placeholder="Email" className="input" />
          <input placeholder="Password" className="input" />
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
