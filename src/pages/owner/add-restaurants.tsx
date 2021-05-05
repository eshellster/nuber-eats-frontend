import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../../__generated__/createAccountMutation";
import {
  createRestaurnt,
  createRestaurntVariables,
} from "../../__generated__/createRestaurnt";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurnt($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurnt,
    createRestaurntVariables
  >(CREATE_RESTAURANT_MUTATION);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProps>({ mode: "onChange" });

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required." })}
          className="input"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          {...register("address", { required: "Address is required." })}
          className="input"
          type="text"
          name="address"
          placeholder="Address"
        />
        <input
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
          className="input"
          type="text"
          name="categoryName"
          placeholder="Category Name"
        />
        <Button
          loading={loading}
          canClick={isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
