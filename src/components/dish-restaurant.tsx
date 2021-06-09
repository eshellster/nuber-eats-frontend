import React from "react";
import { useHistory } from "react-router-dom";
import { DishParts } from "../__generated__/DishParts";
import soldout from "../images/soldout.png";
import comingsoon from "../images/comingsoon.png";
interface IDishProps {
  dish: DishParts;
  restaurantId: number;
}

export const DishRestaurant: React.FC<IDishProps> = ({
  dish,
  restaurantId,
}) => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push({
          pathname: "/edit-dish/" + dish.id,
          state: { dish, restaurantId },
        });
      }}
      className={`border-2 border-gray-500 cursor-pointer hover:border-gray-800 transition-all relative
      `}
    >
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
      <div>
        <div
          className={`pl-2 ${
            dish.invisible ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {dish.invisible ? "시즌오프" : dish.soldOut ? "판매마감" : ""}
        </div>

        <div
          className={`px-8 py-4 ${
            (dish.invisible || dish.soldOut) && "opacity-40"
          }`}
        >
          <div className="mb-5 relative">
            <div className="text-sm"></div>
            <div className="grid grid-cols-2">
              <h3 className="text-xl font-medium ">{dish.name}</h3>
              <div className="text-right">{dish.price}₩</div>
            </div>

            <h4 className="font-sans text-sm text-gray-500">
              {dish.description}
            </h4>
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
      </div>
    </div>
  );
};
