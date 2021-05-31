import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { editDishVariables } from "../../__generated__/editDish";
import {
  DishOptionInputType,
  EditDishInput,
} from "../../__generated__/globalTypes";
import { EditOptionFields } from "./edit-options-fieldArray";

interface LocationState {
  dish: EditDishInput;
}

interface IForm {
  dishId: number;
  soldOut: boolean;
  invisible: boolean;
  name: string;
  price: number;
  description: string;
  options: DishOptionInputType[];
}

interface IParamProps {
  id: string;
}
export const EditDish: React.FC = () => {
  const { id } = useParams<IParamProps>();
  const history = useHistory();
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
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      ...(dish.name && { name: dish.name }),
      ...(dish.price && { price: dish.price }),
      ...(dish.soldOut && { soldOut: dish.soldOut }),
      ...(dish.invisible && { invisible: dish.invisible }),
      ...(dish.description && { description: dish.description }),
      ...(dish.options && { options: dish.options }),
    },
  });

  useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = () => {
    const {
      name,
      price,
      soldOut,
      invisible,
      description,
      options,
    } = getValues();

    const org_options = dish.options?.map((dishOption) => ({
      name: dishOption.name,
      extra: dishOption.extra,
      choices: dishOption.choices?.map((choice) => ({
        name: choice.name,
        extra: choice.extra ? +choice.extra : null,
      })),
    }));

    const dish_options = options.map((dishOption) => ({
      name: dishOption.name,
      extra: dishOption.extra,
      choices: dishOption.choices?.map((choice) => ({
        name: choice.name,
        extra: choice.extra ? +choice.extra : null,
      })),
    }));

    editDish({
      variables: {
        editDishInput: {
          dishId: +id,
          ...(name !== dish.name && { name }),
          ...(price !== dish.price && { price: +price }),
          ...(soldOut !== dish.soldOut && { soldOut }),
          ...(invisible !== dish.invisible && { invisible }),
          ...(description !== dish.description && { description }),
          ...(JSON.stringify(org_options) !== JSON.stringify(options) && {
            options: dish_options,
          }),
        },
      },
    });
    history.goBack();
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
          min={0}
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
