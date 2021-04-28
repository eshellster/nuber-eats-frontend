import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Redirect, useHistory, useParams } from "react-router";
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
  const history = useHistory();
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

  return <div>{data?.restaurant.error && <div>레스토랑이 없습니다.</div>}</div>;
};
