import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

interface IChoicesProp {
  nestIndex: any;
  control: any;
  register: any;
}

export const EditChoicesNestedFieldArray: React.FC<IChoicesProp> = ({
  nestIndex,
  control,
  register,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `option[${nestIndex}].choices`,
  });

  console.log(control);

  const {
    defaultValuesRef: {
      current: { options },
    },
  } = control;

  useEffect(() => {
    if (options.length > 0)
      if (options[nestIndex].choices.length > 0) {
        const optionChoices = options[nestIndex].choices;
        append(
          optionChoices.map((choice: any) => ({
            choiceName: choice.name,
            choicePrice: choice.extra,
          }))
        );
      }
  }, []);

  return (
    <div className="ml-10">
      <button
        onClick={() => append({ choiceName: "", choicePrice: 0 })}
        className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
      >
        Add Option Choice
      </button>
      {fields.map((field, index) => (
        <div key={field.id} className="mt-5">
          <input
            className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
            {...register(
              `option[${nestIndex}].choices.${index}.choiceName` as const,
              {
                required: "Description is required.",
              }
            )}
            type="text"
            placeholder="Choice Name"
          />
          <input
            className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
            {...register(
              `option[${nestIndex}].choices.${index}.choicePrice` as const,
              {
                required: "Description is required.",
              }
            )}
            type="number"
            placeholder="Choice Price"
          />
          <button
            className="w-6 h-6 rounded-full bg-red-600 text-white font-mono"
            type="button"
            onClick={() => remove(index)}
          >
            &#8212;
          </button>
        </div>
      ))}
    </div>
  );
};
