import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEARCH_RESTAURANTS_QUERY = gql`
  query searchRestaurantsQuery($input: SearchRestaurantsInput!) {
    searchRestaurants {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const SearchRestaurants = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return <div></div>;
};
