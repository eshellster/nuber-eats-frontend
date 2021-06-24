import { useApolloClient } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.svg";
import { UserRole } from "../__generated__/globalTypes";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => {
  const { data } = useMe();
  const client = useApolloClient();
  console.log(data);

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className=" py-4">
        <div className="px-5 xl:px-0 w-full max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
            {data?.me.role === UserRole.Client && (
              <div className="mt-1 text-center font-bold text-white bg-yellow-600">
                주문
              </div>
            )}
            {data?.me.role === UserRole.Owner && (
              <div className="mt-1 text-center font-bold text-white bg-red-700">
                Restaurant
              </div>
            )}
            {data?.me.role === UserRole.Delivery && (
              <div className="mt-1 text-center font-bold text-white bg-indigo-600">
                Driver
              </div>
            )}
          </Link>

          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
          <span className="text-xs">{email}</span>
          {isLoggedInVar && (
            <button
              onClick={() => {
                authTokenVar("");
                isLoggedInVar(false);
                localStorage.setItem(LOCALSTORAGE_TOKEN, "");
                client.clearStore();
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </header>
    </>
  );
};
