import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
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
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
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
        </div>
      )}
    </div>
  );
};
