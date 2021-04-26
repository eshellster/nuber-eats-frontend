import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Restaurant } from "../../components/restaurants";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($restaurantsInput: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $restaurantsInput) {
      ok
      error
      totalPages
      totalResults
      results {
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

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: {
        page,
        limit: 6,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input rounded-md border-0 w-3/4 md:w-1/3"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-8">
          <div className="overflow-x-auto flex max-w-5xl mx-auto ">
            {data?.allCategories.categories?.map((category, index) => (
              <div
                key={index}
                className="flex flex-col group items-center cursor-pointer px-5"
              >
                <div
                  className="w-24 h-24 bg-cover border-2 border-opacity-0 border-green-500  group-hover:border-opacity-100 rounded-full"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="mt-1 text-sm text-center font-medium group-hover:text-green-800">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-x-5 gap-y-5">
            {data?.restaurants.results?.map((restaurant) => (
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
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
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
