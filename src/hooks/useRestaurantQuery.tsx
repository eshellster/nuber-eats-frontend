import { gql, useQuery } from "@apollo/client";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../fragments";
import { Role } from "../pages/client/restaurant";
import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../__generated__/restaurantQuery";

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

export const useRestaurantQuery = (restaurantId: number, setOrders: any) => {
  const onCompleted = (data: restaurantQuery) => {
    const menus = data?.restaurant.restaurant?.menu.map((dish) => ({
      dishId: dish.id,
      name: dish.name,
      description: dish.description || "",
      price: dish.price,
      role: Role.dish,
      count: 0,
      invisible: dish.invisible,
      soldOut: dish.soldOut,
      options: dish.options?.map((option) => ({
        name: option.name,
        price: option.extra,
        count: 0,
        choices: option.choices?.map((choice) => ({
          parentName: option.name,
          name: choice.name,
          price: choice.extra,
          count: 0,
        })),
      })),
    }));
    if (menus) setOrders(menus);
  };

  return useQuery<restaurantQuery, restaurantQueryVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId,
      },
    },
    onCompleted,
  });
};
