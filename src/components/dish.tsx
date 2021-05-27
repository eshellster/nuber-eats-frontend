import React from "react";
import { Link, useParams } from "react-router-dom";
import { myRestaurant_myRestaurant_restaurant_menu_options } from "../__generated__/myRestaurant";

interface IDishProps {
  description: string;
  name: string;
  price: number;
  options?: myRestaurant_myRestaurant_restaurant_menu_options[] | null;
}

interface IParams {
  id: string;
}

export const Dish: React.FC<IDishProps> = ({
  description,
  name,
  price,
  options,
}) => {
  const { id } = useParams<IParams>();
  return (
    <Link
      to={`/edit-dish/:${id}`}
      className=" px-8 py-4 border-2 border-gray-500 cursor-pointer hover:border-gray-800 transition-all "
    >
      <div className="mb-5 ">
        <div className="grid grid-cols-2">
          <h3 className="text-xl font-medium ">{name}</h3>
          <div className="text-right">{price}₩</div>
        </div>

        <h4 className="font-sans text-sm text-gray-500">{description}</h4>
      </div>

      {options?.map((option) => (
        <div className="text-sm">
          <div className="grid grid-cols-2">
            <div>{option.name}</div>
            {option.extra && option.extra > 0 ? (
              <div className="text-right">+ {option.extra}₩</div>
            ) : null}
          </div>
          <div className="ml-5">
            {option.choices?.map((choice) => (
              <div className="grid grid-cols-2">
                <div>{choice.name}</div>
                {choice.extra && choice.extra > 0 ? (
                  <div className="text-right">+ {choice.extra}₩</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Link>
  );
};
