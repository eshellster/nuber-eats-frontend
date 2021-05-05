import { gql } from "@apollo/client";
import React from "react";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurnt($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

export const AddRestaurants = () => {
  return <div></div>;
};
