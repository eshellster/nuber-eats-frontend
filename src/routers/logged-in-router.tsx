import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../pages/header";
import { UserRole } from "../__generated__/globalTypes";

const ClientRoutes = [
  <Route key="restaurants">
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  // console.log(data);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-semibold tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Client && ClientRoutes}
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
};
