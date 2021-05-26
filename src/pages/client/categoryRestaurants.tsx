import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Restaurant } from "../../components/restaurant";
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
  const [page, setPage] = useState(1);
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
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  // console.log(data);

  return (
    <div>
      <Helmet>
        <title>Category | Nuber</title>
      </Helmet>
      <h1>Category</h1>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          <div className="mt-10 grid md:grid-cols-3 gap-x-5 gap-y-5">
            {data?.category.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg + ""}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                className="focus:outline-none font-medium text-2xl"
                onClick={onPrevPageClick}
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
              <button
                className="focus:outline-none font-medium text-2xl"
                onClick={onNextPageClick}
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
