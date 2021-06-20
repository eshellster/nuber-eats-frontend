import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurantsQuery,
  searchRestaurantsQueryVariables,
} from "../../__generated__/searchRestaurantsQuery";

const SEARCH_RESTAURANTS_QUERY = gql`
  query searchRestaurantsQuery($input: SearchRestaurantsInput!) {
    searchRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface LocationState {
  searchRestaurantTerm: string;
}

export const SearchRestaurants = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<
    searchRestaurantsQuery,
    searchRestaurantsQueryVariables
  >(SEARCH_RESTAURANTS_QUERY);
  useEffect(() => {
    const {
      state: { searchRestaurantTerm },
    } = location;
    if (searchRestaurantTerm === "korean") {
      return history.replace("/");
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          limit: 6,
          query: searchRestaurantTerm,
        },
      },
    });
  }, [location, history, queryReadyToStart]);
  console.log(loading, data, called);

  return (
    <div>
      <Helmet>
        <title>Search Restaurants | Nuber</title>
      </Helmet>
    </div>
  );
};
