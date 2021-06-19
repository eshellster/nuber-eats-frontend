import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router";
import { DishOrder } from "../../components/dish-order";
import { OrderList } from "../../components/orderList";

import { useRestaurantQuery } from "../../hooks/useRestaurantQuery";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

interface IParamProp {
  id: string;
}
export interface IChoiceOrderedProps {
  parentName: string;
  name: string;
  price?: number | null;
  count?: number;
}
export interface IOptionOrderedProps {
  name: string;
  price?: number | null;
  count?: number;
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
  invisible: boolean;
  soldOut: boolean;
}

export const Restaurant = () => {
  const params = useParams<IParamProp>();
  const history = useHistory();
  const [orders, setOrders] = useState<IDishOrderedProps[]>([]);
  const [bill, setBill] = useState<CreateOrderItemInput[]>([]);

  const { loading, data } = useRestaurantQuery(+params.id, setOrders);
  const restaurant = data?.restaurant.restaurant;

  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`);
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, { onCompleted });
  const triggerConfirmOrder = async () => {
    if (placingOrder) {
      return;
    }

    if (bill.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok && !placingOrder) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +params.id,
            items: bill,
          },
        },
      });
    }
  };

  const orderList: CreateOrderItemInput[] = orders
    .filter((dish) => dish.count)
    .map((dish) => ({
      dishId: dish.dishId,
      orderSize: dish.count || 0,
      options: dish.options
        ?.filter((option) => option.count)
        .map((option) => ({
          name: option.name,
          orderSize: option.count || 0,
          choices: option.choices
            ?.filter((choice) => choice.count)
            .map((choice) => ({ name: choice.name })),
        })),
    }));
  useEffect(() => {
    // console.log(orderList);
    setBill(orderList);
    // console.log(orders);
  }, [orders, orderList]);

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
            <OrderList orders={orders} />
          </header>

          <div className="container p-10 ">
            <div className="grid grid-cols-8">
              <button
                onClick={triggerConfirmOrder}
                className="col-span-1 py-3 px-4 bg-red-700 text-white font-bold"
              >
                전체주문 결제하기
              </button>
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
