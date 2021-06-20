import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { deleteDishVariables } from "../../__generated__/deleteDish";
import { editDishVariables } from "../../__generated__/editDish";
import { DeleteDishInput } from "../../__generated__/globalTypes";
import {
  DishOptionInputType,
  EditDishInput,
} from "../../__generated__/globalTypes";
import { EditOptionFields } from "./edit-options-fieldArray";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

interface LocationState {
  dish: EditDishInput;
  restaurantId: number;
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

const useDeleteInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return { value, onChange };
};
const EDIT_DISH_MUTATION = gql`
  mutation editDish($editDishInput: EditDishInput!) {
    editDish(input: $editDishInput) {
      ok
      error
    }
  }
`;

const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($deleteDishInput: DeleteDishInput!) {
    deleteDish(input: $deleteDishInput) {
      ok
      error
    }
  }
`;

export const EditDish: React.FC = () => {
  const param = useParams<IParamProps>();
  const history = useHistory();
  const {
    state: { dish, restaurantId },
  } = useLocation<LocationState>();

  const deleteMenu = useDeleteInput("");

  const [editDish, { loading }] = useMutation<EditDishInput, editDishVariables>(
    EDIT_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id: restaurantId,
            },
          },
        },
      ],
    }
  );
  const [deleteDish] = useMutation<DeleteDishInput, deleteDishVariables>(
    DELETE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id: restaurantId,
            },
          },
        },
      ],
    }
  );
  const {
    register,
    getValues,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<IForm>({
    mode: "onBlur",
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
  // console.log(param.id);

  const handleDeleteDish = () => {
    if (matchName()) {
      deleteDish({
        variables: {
          deleteDishInput: {
            dishId: +param.id,
          },
        },
      });
      history.goBack();
    }
  };

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
      extra: dishOption.extra ? +dishOption.extra : null,
      choices: dishOption.choices?.map((choice) => ({
        name: choice.name,
        extra: choice.extra ? +choice.extra : null,
      })),
    }));

    const dish_options = options.map((dishOption) => ({
      name: dishOption.name,
      extra: dishOption.extra ? +dishOption.extra : null,
      choices: dishOption.choices?.map((choice) => ({
        name: choice.name,
        extra: choice.extra ? +choice.extra : null,
      })),
    }));

    // console.log(JSON.stringify(org_options) === JSON.stringify(dish_options));

    // console.log("dish_options:", dish_options);

    editDish({
      variables: {
        editDishInput: {
          dishId: +param.id,
          ...(name !== dish.name && { name }),
          ...(price !== dish.price && { price: +price }),
          ...(soldOut !== dish.soldOut && { soldOut }),
          ...(invisible !== dish.invisible && { invisible }),
          ...(description !== dish.description && { description }),
          ...(JSON.stringify(org_options) !== JSON.stringify(dish_options) && {
            options: dish_options,
          }),
        },
      },
    });
    history.goBack();
  };

  const matchName = useCallback(() => {
    return dish.name === deleteMenu.value;
  }, [dish.name, deleteMenu.value]);

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
        <input
          {...register("description")}
          className="input"
          type="text"
          min={0}
          placeholder="description"
        />
        <div className="my-10">
          <h4 className="font-medium mb-3 text-g">Dish Options</h4>
          <EditOptionFields control={control} register={register} />
        </div>
        <Button loading={loading} canClick={isValid} actionText="Save Dish" />
      </form>

      <div className=" border-2 p-4 my-5 max-w-screen-sm w-full">
        <div>
          해당 메뉴를 삭제를 원하시면 아래에 메뉴의 이름을 입력해 주세요
        </div>
        <input
          className="w-full border-2 p-2 my-2 border-red-700 rounded-md"
          type="text"
          placeholder="삭제할 메뉴 이름"
          {...deleteMenu}
        />
        <div>
          <button
            className={`w-full bg-red-700 text-white p-2 focus:outline-none`}
            style={{
              backgroundColor: `${matchName() ? "#A50002" : "#A3a3a3"}`,
              cursor: `${matchName() ? "pointer" : "default"}`,
            }}
            onClick={handleDeleteDish}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
