import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button";
import { DishParts } from "../../__generated__/DishParts";
import { editDishVariables } from "../../__generated__/editDish";
import { EditDishInput } from "../../__generated__/globalTypes";
import { EditOptionFields } from "./edit-options-fieldArray";

interface LocationState {
  dish: DishParts;
}

export const EditDish: React.FC = () => {
  const {
    state: { dish },
  } = useLocation<LocationState>();

  const EDIT_DISH_MUTATION = gql`
    mutation editDish($editDishInput: EditDishInput!) {
      editDish(input: $editDishInput) {
        ok
        error
      }
    }
  `;

  const [editDish, { loading }] = useMutation<EditDishInput, editDishVariables>(
    EDIT_DISH_MUTATION
  );

  const {
    register,
    getValues,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      soldOut: false,
      invisible: false,
      description: dish.description,
      options: dish.options,
    },
  });

  useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = () => {
    const {
      dishId,
      name,
      price,
      soldOut,
      invisible,
      description,
      options,
    } = getValues();
    editDish({
      variables: {
        editDishInput: {
          dishId,
          name,
          price,
          soldOut,
          invisible,
          description,
          options,
        },
      },
    });
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>Edit Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Edit dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <div className="grid grid-cols-2">
          <div>
            <input {...register("soldOut")} className="mx-2" type="checkbox" />
            판매 마감
          </div>

          <div className="text-right">
            <input
              {...register("invisible")}
              className="mx-2"
              type="checkbox"
            />
            시즌 오프
          </div>
        </div>
        <input
          {...register("name")}
          className="input"
          type="text"
          placeholder="Name"
        />
        <input
          {...register("price")}
          className="input"
          type="number"
          placeholder="price"
        />
        <div className="my-10">
          <h4 className="font-medium mb-3 text-g">Dish Options</h4>
          <EditOptionFields control={control} register={register} />
        </div>
        <Button loading={loading} canClick={isValid} actionText="Save Dish" />
      </form>
    </div>
  );
};
