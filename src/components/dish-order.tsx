import React, { useEffect, useState } from "react";
import {
  IChoiceOrderedProps,
  IDishOrderedProps,
  IOptionOrderedProps,
  Role,
} from "../pages/client/restaurant";
import soldout from "../images/soldout.png";
import comingsoon from "../images/comingsoon.png";

interface IDishOrderProps {
  dish: IDishOrderedProps;
  orders: IDishOrderedProps[];
  setOrders: React.Dispatch<React.SetStateAction<IDishOrderedProps[]>>;
}

export interface IOrderCounterProps {
  unable?: boolean;
  dishID: number;
  parentName?: string;
  name: string;
  price?: number | null;
  role: Role;
  orders: IDishOrderedProps[];
  setOrders: React.Dispatch<React.SetStateAction<IDishOrderedProps[]>>;
}
const OrderCounter: React.FC<IOrderCounterProps> = ({
  unable,
  dishID: dishId,
  name,
  price,
  role,
  orders,
  setOrders,
  parentName,
}) => {
  const getCountSize = () => {
    const dish = orders.find((dish) => dish.dishId === dishId);
    if (dish) {
      switch (role) {
        case Role.dish:
          return dish?.count;

        case Role.option:
          if (!dish.count) return 0;
          const option = dish?.options?.filter(
            (option) => option.name === name
          )[0];
          return option?.count;

        case Role.choice:
          const choiceOption = dish?.options?.find(
            (option) => option.name === parentName
          );
          if (!choiceOption?.count || !dish.count) return 0;

          const choice = choiceOption?.choices?.filter(
            (choice) => choice.name === name
          )[0];

          return choice?.count;

        default:
          break;
      }
      return 0;
    }
  };
  // const [count, setCount] = useState(0);
  // const [dishCancel, setDishCancel] = useState(true);
  const [checked, setChecked] = useState(false);
  const order = orders.filter((order) => order.dishId === dishId)[0];
  const otherOrders = (orders: IDishOrderedProps[]) => {
    return orders.filter((order) => order.dishId !== dishId);
  };
  const otherOptions = (options: IOptionOrderedProps[] | undefined) => {
    if (options) {
      return options.filter((option) => option.name !== name);
    } else {
      return [];
    }
  };

  const otherChoicesOptions = (options: IOptionOrderedProps[] | undefined) => {
    if (options) {
      return options.filter((option) => option.name !== parentName);
    } else {
      return [];
    }
  };
  const otherChoices = (choices: IChoiceOrderedProps[] | undefined) => {
    if (choices) {
      return choices
        .filter((choice) => choice.name !== name)
        .map((choice) => ({
          ...choice,
          count: 0,
        }));
    } else {
      return [];
    }
  };

  const setOrderSize = (input: number) => {
    const otherOrder = otherOrders(orders);
    if (role === Role.dish) {
      setOrders([
        ...otherOrder,
        {
          ...order,
          count: input,
        },
      ]);
    } else {
      if (role === Role.option) {
        const options = otherOptions(order.options);
        const option = order.options?.find((option) => option.name === name);
        if (option) {
          setOrders([
            ...otherOrder,
            { ...order, options: [...options, { ...option, count: input }] },
          ]);
        }
      }
      if (role === Role.choice) {
        const options = otherChoicesOptions(order.options);
        const option = order.options?.find(
          (option) => option.name === parentName
        );
        if (option) {
          const choices = otherChoices(option?.choices);
          const choice = option?.choices?.find(
            (choice) => choice.name === name
          );
          if (choice) {
            setOrders([
              ...otherOrder,
              {
                ...order,
                options: [
                  ...options,
                  {
                    ...option,
                    choices: [...choices, { ...choice, count: input }],
                  },
                ],
              },
            ]);
          }
        }
      }
    }
  };

  const addOrderSize = () => {
    const currentSize = getCountSize();
    if (currentSize) setOrderSize(currentSize + 1);
  };
  const subOrderSize = () => {
    const currentSize = getCountSize();
    if (currentSize) setOrderSize(currentSize - 1);
  };
  const toggleCheck = () => {
    if (getCountSize()) {
      setOrderSize(0);
      // resetOrderChilden();
    } else {
      setOrderSize(1);
    }
    setChecked(!checked);
  };
  useEffect(() => {}, []);
  return (
    <div className=" grid grid-cols-3 ">
      <div className="col-span-2 grid grid-cols-4 items-center">
        <span className="col-span-3 font-medium inline-block align-middle">
          {name}
        </span>
        {price ? (
          <span className="text-sm align-middle  text-right mr-6 ">
            {price}₩
          </span>
        ) : null}
      </div>
      {role === Role.choice ? (
        <div className="text-sm flex flex-row items-center justify-end">
          {unable ? null : (
            <button className="ml-3 w-4 h-4 ring-1 " onClick={toggleCheck}>
              {getCountSize() ? <span>&#10003;</span> : null}
            </button>
          )}
        </div>
      ) : (
        <div className="text-sm flex flex-row items-center justify-end">
          <div
            className={`${
              (!getCountSize() || !price) && "hidden"
            } flex items-center`}
          >
            <button
              onClick={subOrderSize}
              className="focus:outline-none w-5 h-4 ring-1 rounded-full rounded-r-none align-middle leading-4"
            >
              -
            </button>
            <div className="w-5 h-5 text-center align-middle leading-5">
              {getCountSize()}
            </div>
            <button
              onClick={addOrderSize}
              className="w-5 h-4 ring-1 rounded-full rounded-l-none align-middle leading-4"
            >
              +
            </button>
          </div>
          {unable ? null : (
            <button className="ml-3 w-4 h-4 ring-1 " onClick={toggleCheck}>
              {getCountSize() ? <span>&#10003;</span> : null}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const DishOrder: React.FC<IDishOrderProps> = ({
  dish,
  orders,
  setOrders,
}) => {
  return (
    <div className="relative px-4 py-4 border-2 border-gray-500 hover:border-gray-800 transition-all">
      {dish.invisible ? (
        <img
          src={comingsoon}
          alt="coming soon"
          className="absolute w-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : dish.soldOut ? (
        <img
          src={soldout}
          alt="sold out"
          className="absolute w-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : null}
      <div className="text-2xl">
        <OrderCounter
          unable={dish.invisible || dish.soldOut}
          dishID={dish.dishId}
          name={dish.name}
          price={dish.price ? dish.price : 0}
          role={Role.dish}
          orders={orders}
          setOrders={setOrders}
        />
      </div>

      <h4 className="font-sans text-sm text-gray-500 mb-2">
        {dish.description}
      </h4>

      {dish.options
        ?.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        })
        .map((option, index) => (
          <div key={index} className="text-sm ml-5">
            <OrderCounter
              unable={dish.invisible || dish.soldOut}
              dishID={dish.dishId}
              name={option.name}
              price={option.price}
              role={Role.option}
              orders={orders}
              setOrders={setOrders}
            />
            <div className="ml-5">
              {option.choices
                ?.sort(function (a, b) {
                  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                })
                .map((choice, index) => (
                  <div key={index}>
                    <OrderCounter
                      unable={dish.invisible || dish.soldOut}
                      dishID={dish.dishId}
                      parentName={choice.parentName}
                      name={choice.name}
                      price={choice.price}
                      role={Role.choice}
                      orders={orders}
                      setOrders={setOrders}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
