import React from "react";

export const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-50 w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form className="flex flex-col px-5 mt-5">
          <input
            placeholder="Email"
            className="bg-gray-100 border-2 shadow-inner focus:border-opacity-60 focus:bg-green-600 focus:outline-none mb-3 py-3 px-5 rounded-lg"
          />
          <input
            placeholder="Password"
            className="bg-gray-100 shadow-inner focus:border-opacity-60 focus:bg-green-600 focus:outline-none py-3 px-5 rounded-lg"
          />
          <button className="py-3 px-5 bg-green-800 text-white mt-3 text-lg rounded-lg foucs:Outline-none hover:opacity-90">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
