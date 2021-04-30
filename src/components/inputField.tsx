import React from "react";

interface IInputFieldProps {
  register: any;
  errorMessage?: string | null;
  name: string;
  lableName: string;
  type: string;
}

export const InputField: React.FC<IInputFieldProps> = ({
  register,
  errorMessage,
  name,
  lableName,
  type,
}) => {
  return (
    <div
      className={`relative my-4 border-b-2 ${
        errorMessage ? "border-red-500" : "focus-within:border-blue-500"
      }`}
    >
      <input
        {...register("email")}
        type={type}
        name={name}
        placeholder=" "
        className="block w-full appearance-none focus:outline-none bg-transparent"
      />
      <label
        htmlFor={name}
        className="absolute top-0 -z-1 duration-300 origin-0"
      >
        {lableName}
      </label>
      <div className="absolute font-medium text-sm text-gray-400">
        {errorMessage}
      </div>
    </div>
  );
};
