import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { DishParts } from "../__generated__/DishParts";

interface IDishProps {
  dish: DishParts;
}

interface IParams {
  id: string;
}

export const Dish: React.FC<IDishProps> = ({ dish }) => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  return (
    <div
      onClick={() => {
        history.push({ pathname: "/edit-dish/" + id, state: { dish } });
      }}
      className=" px-8 py-4 border-2 border-gray-500 cursor-pointer hover:border-gray-800 transition-all "
    >
      <div className="mb-5 ">
        <div className="grid grid-cols-2">
          <h3 className="text-xl font-medium ">{dish.name}</h3>
          <div className="text-right">{dish.price}₩</div>
        </div>

        <h4 className="font-sans text-sm text-gray-500">{dish.description}</h4>
      </div>

      {dish.options?.map((option, index) => (
        <div key={index} className="text-sm">
          <div className="grid grid-cols-2">
            <div>{option.name}</div>
            {option.extra && option.extra > 0 ? (
              <div className="text-right">+ {option.extra}₩</div>
            ) : null}
          </div>
          <div className="ml-5">
            {option.choices?.map((choice, index) => (
              <div key={index} className="grid grid-cols-2">
                <div>{choice.name}</div>
                {choice.extra && choice.extra > 0 ? (
                  <div className="text-right">+ {choice.extra}₩</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
