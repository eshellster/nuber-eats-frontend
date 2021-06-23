import { gql, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { FULL_ORDERS_FRAGMENT } from "../fragments";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";
import {
  OrderUpdates,
  OrderUpdatesVariables,
} from "../__generated__/OrderUpdates";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDERS_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription OrderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDERS_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  const order = data?.getOrder.order;

  const { data: subscriptionData } = useSubscription<
    OrderUpdates,
    OrderUpdatesVariables
  >(ORDER_SUBSCRIPTION, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
  console.log(subscriptionData);

  return (
    <div className="mt-32 container flex justify-center">
      <Helmet>
        <title>주문 #{params.id} | Nuber Eats</title>
      </Helmet>
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{params.id}
        </h4>
        <h5 className="p-5 pt-10 text-3xl text-center ">{order?.total}₩</h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            Prepared By:{" "}
            <span className="font-medium">{order?.restaurant?.name}</span>
          </div>
          <div className="border-t pt-5 border-gray-700 ">
            Deliver To:{" "}
            <span className="font-medium">{order?.customer?.email}</span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Driver:{" "}
            <span className="font-medium">
              {order?.driver?.email ? order?.driver?.email : "Not yet."}
            </span>
          </div>
          <span className=" text-center mt-5 mb-3  text-xl ">
            Status:
            <span className="text-3xl text-lime-600"> {order?.status}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
