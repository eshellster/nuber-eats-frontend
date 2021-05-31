import React from "react";
import { useFieldArray } from "react-hook-form";
import { EditChoicesNestedFieldArray } from "./edit-choices-nestedFieldArray";

interface IOptionFieldsProps {
  control: any;
  register: any;
}

export const EditOptionFields: React.FC<IOptionFieldsProps> = ({
  control,
  register,
}) => {
  const { append, fields, remove } = useFieldArray({
    control,
    name: "options",
  });

  // useEffect(() => {
  //   const dishOptions = control.defaultValuesRef.current.options;
  //   if (dishOptions)
  //     if (dishOptions.length > 0)
  //       append(
  //         dishOptions.map((option: any) => ({
  //           name: option.name,
  //           extra: option.extra | 0,
  //         }))
  //       );
  // }, []);

  return (
    <>
      <div>
        <button
          onClick={() => append({ name: "", extra: 0 })}
          className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
        >
          Edit Dish Option
        </button>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mt-5">
              <input
                className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                {...register(`options.${index}.name` as const, {
                  required: "Description is required.",
                })}
                type="text"
                placeholder="Option Name"
              />
              <input
                className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                {...register(`options.${index}.extra` as const)}
                type="number"
                placeholder="Option Price"
              />
              <button
                className="w-6 h-6 rounded-full bg-red-600 text-white font-mono"
                type="button"
                onClick={() => remove(index)}
              >
                &#8212;
              </button>
            </div>
            <div>
              <EditChoicesNestedFieldArray
                nestIndex={index}
                {...{ control, register }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
