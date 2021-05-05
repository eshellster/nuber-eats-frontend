import React from "react";

interface IInputProps {
  register: any;
  name: string;
  errorMessage: string | undefined;
}
interface ISelectProps {
  register: any;
  name: string;
  options: [];
}

export const Input: React.FC<IInputProps> = ({ register, name, ...rest }) => {
  return <input {...register(name)} {...rest} />;
};

export const Select: React.FC<ISelectProps> = ({
  register,
  options,
  name,
  ...rest
}) => {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
