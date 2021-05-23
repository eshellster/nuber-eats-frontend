import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;
interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  option: { optionName: string; optionPrice: number }[];
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const { register, handleSubmit, formState, getValues, control } = useForm<
    IForm
  >({
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "option",
  });
  const onSubmit = () => {
    const { name, price, description, ...options } = getValues();
    console.log(options);

    // createDishMutation({
    //   variables: {
    //     input: {
    //       name,
    //       price: +price,
    //       description,
    //       restaurantId: +restaurantId,
    //     },
    //   },
    // });
    // history.goBack();
  };

  const [optionNumber, setOptionNumber] = useState(0);
  const onAddOpotionClick = () => {
    setOptionNumber((current) => current + 1);
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("name", { required: "Name is required." })}
          className="input"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          {...register("price", { required: "Price is required." })}
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
        />
        <input
          {...register("description", { required: "Description is required." })}
          className="input"
          type="text"
          name="description"
          placeholder="Description"
        />
        <div className="my-10">
          <h4 className="font-medium mb-3 text-g">Dish Options</h4>
          <span
            onClick={onAddOpotionClick}
            className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          >
            Add Dish Option
          </span>
          {optionNumber !== 0 &&
            Array.from(new Array(optionNumber)).map((_, index) => (
              <div key={index} className="mt-5">
                <input
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  {...register(`option.${index}.optionName` as const, {
                    required: "Description is required.",
                  })}
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  {...register(`option.${index}.optionPrice` as const, {
                    required: "Description is required.",
                  })}
                  type="number"
                  placeholder="Option Price"
                />
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
