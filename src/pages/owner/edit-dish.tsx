import { gql } from "@apollo/client";
import React from "react";
import { useLocation } from "react-router-dom";

export const EditDish: React.FC = () => {
  const location = useLocation();
  console.log(location.state);

  const EDIT_DISH_MUTATION = gql`
    mutation editDish($editDishInput: EditDishInput!) {
      editDish(input: $editDishInput) {
        ok
        error
      }
    }
  `;
  return <div></div>;
};
