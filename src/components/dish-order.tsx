import React from "react";
import { useHistory } from "react-router-dom";
import { DishParts } from "../__generated__/DishParts";

interface IDishProps {
  dish: DishParts;
  restaurantId: number;
}

export const DishOrder: React.FC<IDishProps> = ({ dish, restaurantId }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push({
          pathname: "/edit-dish/" + dish.id,
          state: { dish, restaurantId },
        });
      }}
      className="px-8 py-4 border-2 border-gray-500 cursor-pointer hover:border-gray-800 transition-all"
    >
      <div className="mb-5 ">
        <h3 className="text-2xl font-medium inline-block align-middle">
          {dish.name}
        </h3>
        <span className="align-middle ml-3">({dish.price}₩)</span>

        <h4 className="font-sans text-sm text-gray-500">{dish.description}</h4>
      </div>

      {dish.options && dish.options.length !== 0 && (
        <h2 className="text-sm border-b mb-2">선택사항</h2>
      )}
      {dish.options?.map((option, index) => (
        <div key={index} className="text-sm">
          <div className="">
            <h4 className="inline-block align-middle font-bold">
              {option.name}
            </h4>
            {option.extra && option.extra > 0 ? (
              <span className="align-middle ml-3"> ({option.extra}₩)</span>
            ) : null}
          </div>
          <div className="ml-5">
            {option.choices?.map((choice, index) => (
              <div key={index} className="">
                <h4 className="inline-block align-middle font-bold">
                  {choice.name}
                </h4>
                {choice.extra && choice.extra > 0 ? (
                  <span className="align-middle ml-3"> ({choice.extra}₩)</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
