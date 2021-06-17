import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
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
export interface IChoiceOrderedProps {
  parentName: string;
  name: string;
  price?: number | null;
  count: number;
}
export interface IOptionOrderedProps {
  name: string;
  price?: number | null;
  count: number;
  choices?: IChoiceOrderedProps[];
}

export enum Role {
  dish = "dish",
  option = "option",
  choice = "choice",
}
export interface IDishOrderedProps {
  dishId: number;
  name: string;
  description: string;
  price?: number | null;
  role: Role;
  count?: number;
  options?: IOptionOrderedProps[];
}

export const Restaurant = () => {
  const { id } = useParams<IParamProp>();
  const [orders, setOrders] = useState<IDishOrderedProps[]>([]);

  const onCompleted = (data: restaurantQuery) => {
    const menus = data?.restaurant.restaurant?.menu.map((dish) => ({
      dishId: dish.id,
      name: dish.name,
      description: dish.description || "",
      price: dish.price,
      role: Role.dish,
      count: 0,
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
  const { loading, data } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
      onCompleted,
    }
  );
  const restaurant = data?.restaurant.restaurant;

  useEffect(() => {
    // setOrders();
  }, [orders]);
  return (
    <div>
      <Helmet>
        <title>{restaurant?.name || ""} | Nuber eats</title>
      </Helmet>
      {data?.restaurant.error && <div>레스토랑이 없습니다.</div>}
      {!loading && (
        <div>
          <header
            className="grid grid-cols-2 bg-gray-500 w-full py-24  bg-cover bg-center bg-"
            style={{
              backgroundImage: `url(${restaurant?.coverImg})`,
            }}
          >
            <div className="bg-white max-w-sm py-8 pl-48">
              <h4 className="text-4xl mb-3">{restaurant?.name}</h4>
              <h5 className="text-sm font-light mb-2">
                {restaurant?.category?.name}
              </h5>
              <h6 className="text-sm font-light">{restaurant?.address}</h6>
            </div>
            <div className="bg-white max-w-sm py-8 px-8">
              <div className="w-96 grid grid-rows-1">
                {orders
                  .filter((dish) => dish.count)
                  .map((dish) => (
                    <div className="space-x-3">
                      <span>{dish.name}</span>
                      <span>가격:{dish.price}</span>
                      <span>:{dish.count}</span>

                      <span>
                        금액:
                        {dish.price && dish.count && dish.price * dish.count}
                      </span>
                      {dish.options
                        ?.filter((option) => option.count)
                        .map((option) => (
                          <div className="text-sm ml-3">
                            <span>{option.name}</span>
                            {option.price && <span>{option.price}</span>}
                            <span>:{option.count}</span>

                            {option.price && option.count && (
                              <span>금액:{option.price * option.count}</span>
                            )}

                            {option.choices
                              ?.filter((choice) => choice.count)
                              .map((choice) => (
                                <div className="ml-3">
                                  <span>{choice.name}</span>
                                  {choice.price && <span>{choice.price}</span>}
                                  <span>:{choice.count}</span>

                                  {choice.price && choice.count && (
                                    <span>
                                      금액:{choice.price * choice.count}
                                    </span>
                                  )}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </header>

          <div className="container p-10 ">
            <div className="grid grid-cols-8">
              <button className="col-span-1 py-3 px-4 bg-red-700 text-white font-bold">
                전체주문 결제하기
              </button>
              <div className="grid grid-cols-3">
                {/* {orders.map((order, index) => (
                  <div key={index}>{order.dishId}</div>
                ))} */}
              </div>
            </div>
            <div className="mt-10">
              {restaurant?.menu.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a dish!</h4>
              ) : (
                <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                  {orders
                    .sort(function (a, b) {
                      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                    })
                    .map((order, index) => (
                      <DishOrder
                        dish={order}
                        key={index}
                        orders={orders}
                        setOrders={setOrders}
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
