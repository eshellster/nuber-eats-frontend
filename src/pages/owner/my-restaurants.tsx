import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MyRestaurant } from "../../components/my-restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurants,
  myRestaurantsVariables,
} from "../../__generated__/myRestaurants";

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants($input: MyRestaurantsInput!) {
    myRestaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<myRestaurants, myRestaurantsVariables>(
    MY_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
          limit: 6,
        },
      },
    }
  );
  console.log(data);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My Restaurants</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-x-5 gap-y-5">
          {data?.myRestaurants.results?.map((restaurant) => (
            <MyRestaurant
              key={restaurant.id}
              id={restaurant.id + ""}
              coverImg={restaurant.coverImg + ""}
              name={restaurant.name}
              categoryName={restaurant.category?.name}
            />
          ))}
        </div>
        {data?.myRestaurants.totalPages && data.myRestaurants.totalPages > 1 ? (
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
              Page {page} of {data?.myRestaurants.totalPages}
            </span>
            {page !== data?.myRestaurants.totalPages ? (
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
        ) : (
          <div></div>
        )}

        {data?.myRestaurants.ok && data.myRestaurants.results?.length === 0 && (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
