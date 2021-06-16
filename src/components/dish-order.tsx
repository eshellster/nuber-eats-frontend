import React, { useEffect, useState } from "react";
import {
  IChoiceOrderedProps,
  IDishOrderedProps,
  IOptionOrderedProps,
  Role,
} from "../pages/client/restaurant";

interface IDishOrderProps {
  dish: IDishOrderedProps;
  orders: IDishOrderedProps[];
  setOrders: React.Dispatch<React.SetStateAction<IDishOrderedProps[]>>;
}

export interface IOrderCountProps {
  dishID: number;
  parentName?: string;
  name: string;
  price?: number | null;
  role: Role;
  orders: IDishOrderedProps[];
  setOrders: React.Dispatch<React.SetStateAction<IDishOrderedProps[]>>;
}
const OrderCount: React.FC<IOrderCountProps> = ({
  dishID: dishId,
  name,
  price,
  role,
  orders,
  setOrders,
  parentName,
}) => {
  const currCount = () => {
    const dish = orders.find((dish) => dish.dishId === dishId);
    if (dish) {
      switch (role) {
        case Role.dish:
          return dish?.count;

        case Role.option:
          const option = dish?.options?.filter(
            (option) => option.name === name
          )[0];
          return option?.count;

        case Role.choice:
          const choiceOption = dish?.options?.find(
            (option) => option.name === parentName
          );

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
      return choices.filter((choice) => choice.name !== name);
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
    const currentSize = currCount();
    if (currentSize) setOrderSize(currentSize + 1);
  };
  const subOrderSize = () => {
    const currentSize = currCount();
    if (currentSize) setOrderSize(currentSize - 1);
  };
  const toggleCheck = () => {
    if (currCount()) {
      setOrderSize(0);
      console.log("setOrderSize:", 0);
    } else {
      setOrderSize(1);
      console.log("setOrderSize:", 1);
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
      <div className="text-sm flex flex-row items-center justify-end">
        <div
          className={`${
            (!currCount() || !price) && "hidden"
          } flex items-center`}
        >
          <button
            onClick={subOrderSize}
            className="focus:outline-none w-5 h-4 ring-1 rounded-full rounded-r-none align-middle leading-4"
          >
            -
          </button>
          <div className="w-10 h-5 text-center align-middle leading-5">
            {currCount()}
          </div>
          <button
            onClick={addOrderSize}
            className="w-5 h-4 ring-1 rounded-full rounded-l-none align-middle leading-4"
          >
            +
          </button>
        </div>
        <button className="ml-3 w-4 h-4 ring-1 " onClick={toggleCheck}>
          {currCount() ? <span>&#10003;</span> : null}
        </button>
      </div>
    </div>
  );
};

export const DishOrder: React.FC<IDishOrderProps> = ({
  dish,
  orders,
  setOrders,
}) => {
  return (
    <div className="px-4 py-4 border-2 border-gray-500 hover:border-gray-800 transition-all">
      <div className="text-2xl">
        <OrderCount
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
            <OrderCount
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
                    <OrderCount
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
