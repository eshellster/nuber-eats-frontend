import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { ConfirmEmail } from "../pages/user/confirmEmail";
import { EditProfile } from "../pages/user/edit-profile";
import { SearchRestaurants } from "../pages/client/searchRestaurants";
import { CategoryRestaurants } from "../pages/client/categoryRestaurants";
import { Restaurant } from "../pages/client/restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { NotFound } from "../pages/404";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/add-dish";

const clientRoutes = [
  { path: "/", component: <Restaurants /> },
  { path: "/search-restaurants", component: <SearchRestaurants /> },
  { path: "/category-restaurants/:slug", component: <CategoryRestaurants /> },
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
  { path: "/restaurant/:id", component: <Restaurant /> },
  { path: "/restaurant/:id/add-dish", component: <AddDish /> },
];

const restaurantRoutes = [
  { path: "/", component: <MyRestaurants /> },
  { path: "/add-restaurant", component: <AddRestaurant /> },
  { path: "/my-restaurant/:id", component: <MyRestaurant /> },
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
        {data.me.role === "Client" &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === "Owner" &&
          restaurantRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
