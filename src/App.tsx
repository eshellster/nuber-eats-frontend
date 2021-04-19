import { gql, useQuery } from "@apollo/client";
import React from "react";
import { LoggedOutRouter } from "./routers/logged-out-router";

// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

function App() {
  // const { data } = useQuery(IS_LOGGED_IN);
  // console.log(data);

  return <LoggedOutRouter />;
}

export default App;
