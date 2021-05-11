import React from "react";

interface IErrorMessageFormProps {
  errorMessage: string;
}
export const ErrorMessageForm: React.FC<IErrorMessageFormProps> = (
  errorMessage
) => {
  return <span className="font-medium text-red-500 mb-4">{errorMessage}</span>;
};
