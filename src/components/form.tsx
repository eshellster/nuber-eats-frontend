import React from "react";
import { useForm } from "react-hook-form";

interface IFormProps {
  defaultValues: [Object] | undefined;
  children: JSX.Element[];
  onSubmit: () => void;
}

export const Form: React.FC<IFormProps> = ({
  defaultValues,
  children,
  onSubmit,
}) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full">
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};
