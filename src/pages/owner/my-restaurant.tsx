import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { DishRestaurant } from "../../components/dish-restaurant";
import {
  DISH_FRAGMENT,
  FULL_ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import { getOrders, getOrdersVariables } from "../../__generated__/getOrders";
import { OrderStatus } from "../../__generated__/globalTypes";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import { pendingOrders } from "../../__generated__/pendingOrders";

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

const GET_ORDERS_QUERY = gql`
  query getOrders($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDERS_FRAGMENT}
`;
const PENDING_ORDER_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDERS_FRAGMENT}
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

  const { data: getOrderData } = useQuery<getOrders, getOrdersVariables>(
    GET_ORDERS_QUERY,
    {
      variables: {
        input: {
          status: null,
        },
      },
    }
  );

  // console.log(getOrderData);

  const { data: subscriptionData } = useSubscription<pendingOrders>(
    PENDING_ORDER_SUBSCRIPTION
  );
  const history = useHistory();
  useEffect(() => {
    // console.log(subscriptionData);

    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData, history]);

  return (
    <div>
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || ""} | Nuber eats</title>
      </Helmet>
      {data?.myRestaurant.error && <div>레스토랑이 없습니다.</div>}
      {!loading && (
        <div>
          <header
            className="grid grid-cols-2 bg-gray-500 w-full py-12 bg-no-repeat  bg-center bg-"
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
            <div className="w-full flex justify-end ">
              <div className="bg-white max-w-lg py-8 px-8 mr-10">
                <h1>주문</h1>
                {getOrderData?.getOrders.orders?.map((order, index) => (
                  <div key={index}>
                    <Link to={`/orders/${order.id}`} className="cursor-pointer">
                      <span>#{order.id}</span>{" "}
                      <span
                        className={`${
                          order.status === OrderStatus.Pending &&
                          "text-blue-600"
                        } ${
                          order.status === OrderStatus.Cooking &&
                          "text-lime-600"
                        } ${
                          order.status === OrderStatus.Cooked && "text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
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
