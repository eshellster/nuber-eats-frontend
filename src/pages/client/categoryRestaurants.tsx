import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  categoryRestaurants,
  categoryRestaurantsVariables,
} from "../../__generated__/categoryRestaurants";

const CATEGORY_RESTAURANTS = gql`
  query categoryRestaurants($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        name
        coverImg
        slug
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
interface ICategoryParams {
  slug: string;
}
export const CategoryRestaurants = () => {
  const { slug } = useParams<ICategoryParams>();
  // console.log(params);
  const { data, loading } = useQuery<
    categoryRestaurants,
    categoryRestaurantsVariables
  >(CATEGORY_RESTAURANTS, {
    variables: {
      input: {
        page: 1,
        limit: 6,
        slug: slug,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>Category | Nuber</title>
      </Helmet>
      <h1>Category</h1>
    </div>
  );
};
