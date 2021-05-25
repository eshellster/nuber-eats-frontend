import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";
import { OptionFields } from "./options-fieldArray";

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

interface IChoice {
  choiceName: string;
  choicePrice: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  option: { optionName: string; optionPrice: number; choices: IChoice[] }[];
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
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    getValues,
    control,
  } = useForm<IForm>({
    mode: "onBlur",
  });
  const options = useFieldArray({
    control,
    name: "option",
  });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const options = rest.option.map((dishOption) => ({
      name: dishOption.optionName,
      extra: +dishOption.optionPrice,
      choices: dishOption.choices.map((choice) => ({
        name: choice.choiceName,
        extra: +choice.choicePrice,
      })),
    }));
    // console.log(options);

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options,
        },
      },
    });
    history.goBack();
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
          <OptionFields control={control} register={register} />
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
