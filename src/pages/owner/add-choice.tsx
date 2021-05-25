import React from "react";
import { useFieldArray, UseFormRegister } from "react-hook-form";

interface ChoiceProp {
  register: UseFormRegister<Record<string, any>>;
}

export const Choice: React.FC<ChoiceProp> = ({ register }) => {
  return (
    <>
      <div>
        <label>First name</label>
        <input
          type="text"
          {...register("First name", { required: true, maxLength: 80 })}
        />
      </div>
      <div>
        <label>Last name</label>
        <input
          type="text"
          {...register("Last name", { required: true, maxLength: 100 })}
        />
      </div>
    </>
  );
};
