import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { DishRestaurant } from "../../components/dish-restaurant";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const param = useParams<IParams>();
  const { data, loading } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +param.id,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || ""} | Nuber eats</title>
      </Helmet>
      {data?.myRestaurant.error && <div>레스토랑이 없습니다.</div>}
      {!loading && (
        <div>
          <header
            className="bg-gray-500 w-full py-12 bg-no-repeat  bg-center bg-"
            style={{
              backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
            }}
          >
            <div className="bg-white max-w-sm p-8">
              <h4 className="text-4xl mb-3">
                {data?.myRestaurant.restaurant?.name || "Loading..."}
              </h4>
              <h5 className="text-sm font-light mb-2">
                {data?.myRestaurant.restaurant?.category?.name}
              </h5>
              <h6 className="text-sm font-light">
                {data?.myRestaurant.restaurant?.address}
              </h6>
            </div>
          </header>
          <div className="container p-10 ">
            <Link
              to={`/restaurant/${param.id}/add-dish`}
              className=" mr-8 text-white bg-gray-800 py-3 px-10"
            >
              Add Dish &rarr;
            </Link>
            <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
              Buy Promotion &rarr;
            </Link>
            <div className="mt-10">
              {data?.myRestaurant.restaurant?.menu.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a dish!</h4>
              ) : (
                <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                  {data?.myRestaurant.restaurant?.menu?.map((dish, index) => (
                    <DishRestaurant
                      dish={dish}
                      restaurantId={+param.id}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
