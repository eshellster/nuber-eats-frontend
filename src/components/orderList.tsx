import React from "react";
import { IDishOrderedProps } from "../pages/client/restaurant";

interface IOrderListProps {
  orders: IDishOrderedProps[];
}

export const OrderList: React.FC<IOrderListProps> = ({ orders }) => {
  return (
    <div className="bg-white max-w-sm py-8 px-8">
      <div className="w-96 grid grid-rows-1">
        {orders
          .filter((dish) => dish.count)
          .map((dish, index) => (
            <div key={index} className="space-x-3">
              <span>{dish.name}</span>
              <span>가격:{dish.price}</span>
              <span>:{dish.count}</span>

              <span>
                금액:
                {dish.price && dish.count && dish.price * dish.count}
              </span>
              {dish.options
                ?.filter((option) => option.count)
                .map((option, index) => (
                  <div key={index} className="text-sm ml-3">
                    <span>{option.name} </span>
                    {option.price && <span>가격:{option.price} </span>}
                    <span> 수량:{option.count} </span>

                    {option.price && option.count && (
                      <span> 합계:{option.price * option.count}</span>
                    )}

                    {option.choices
                      ?.filter((choice) => choice.count)
                      .map((choice, index) => (
                        <div key={index} className="ml-3">
                          <span>{choice.name}</span>
                          {choice.price && <span>{choice.price}</span>}

                          {choice.price && choice.count && (
                            <span>금액:{choice.price * choice.count}</span>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
