import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "../yup/loginVaidationSchema";

interface ILoginFormInput {
  email: string;
  password: string;
}

export const Login = () => {
  const onSubmit = () => {};
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(LoginValidationSchema),
  });
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-50 w-full max-w-lg py-5 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 px-5 mt-5"
        >
          <input
            {...register("email")}
            name="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
