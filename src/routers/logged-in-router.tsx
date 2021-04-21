import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  const OnClick = () => {
    isLoggedInVar(false);
  };
  return (
    <div>
      <div>Logged In</div>
      <button onClick={OnClick}>Log out</button>
    </div>
  );
};
