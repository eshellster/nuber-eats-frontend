import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DishOrder } from "../../components/dish-order";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../../__generated__/restaurantQuery";

const RESTAURANT_QUERY = gql`
  query restaurantQuery($input: RestaurantInput!) {
    restaurant(input: $input) {
      error
      ok
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

interface IParamProp {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<IParamProp>();
  const { loading, data } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | Nuber eats</title>
      </Helmet>
      {data?.restaurant.error && <div>레스토랑이 없습니다.</div>}
      {!loading && (
        <div>
          <header
            className="bg-gray-500 w-full py-24  bg-cover bg-center bg-"
            style={{
              backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
            }}
          >
            <div className="bg-white max-w-sm py-8 pl-48">
              <h4 className="text-4xl mb-3">
                {data?.restaurant.restaurant?.name}
              </h4>
              <h5 className="text-sm font-light mb-2">
                {data?.restaurant.restaurant?.category?.name}
              </h5>
              <h6 className="text-sm font-light">
                {data?.restaurant.restaurant?.address}
              </h6>
            </div>
          </header>
          <div className="container p-10 ">
            <div className="mt-10">
              {data?.restaurant.restaurant?.menu.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a dish!</h4>
              ) : (
                <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                  {data?.restaurant.restaurant?.menu?.map((dish, index) => (
                    <DishOrder dish={dish} restaurantId={+id} key={index} />
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
