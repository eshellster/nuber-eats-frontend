import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";

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

interface LocationState {
  searchRestaurantTerm: string;
}

export const SearchRestaurants = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  useEffect(() => {
    const {
      state: { searchRestaurantTerm },
    } = location;
    console.log(searchRestaurantTerm);

    if (!searchRestaurantTerm) {
      history.replace("/");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search Restaurants | Nuber</title>
      </Helmet>
    </div>
  );
};
