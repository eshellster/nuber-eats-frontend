import React from "react";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className="bg-red-500 py-28 bg-cover bg-center mb-3"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl">{name}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
        {categoryName}
      </span>
    </div>
  );
};
