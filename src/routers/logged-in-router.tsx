import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { ConfirmEmail } from "../pages/user/confirmEmail";
import { UserRole } from "../__generated__/globalTypes";
import { EditProfile } from "../pages/user/edit-profile";
import { SearchRestaurants } from "../pages/client/searchRestaurants";
import { CategoryRestaurants } from "../pages/client/categoryRestaurants";

const ClientRoutes = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search-restaurants">
    <SearchRestaurants />
  </Route>,
  <Route key={5} path="/category-restaurants/:slug">
    <CategoryRestaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-semibold tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header email={data.me.email} />
      <Switch>
        {data.me.role === UserRole.Client && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
