import React from "react";
import { useForm } from "react-hook-form";

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
  } = useForm<ILoginFormInput>();
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-50 w-full max-w-lg py-5 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 px-5 mt-5"
        >
          <input
            {...register("email", {
              required: true,
              pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
            name="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.type === "required" && (
            <span className="font-medium text-red-500">
              이메일을 입력해 주세요
            </span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="font-medium text-red-500">
              이메일 형식이 아닙니다
            </span>
          )}
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern: /^.*(?=^.{8,50}$)(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/,
            })}
            placeholder="Password"
            className="input"
          />
          {errors.password?.type === "required" && (
            <span className="font-medium text-red-500">
              패스워드를 입력해 주세요
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="font-medium text-red-500">
              8자이상 영문과 특수문자로 만들어주세요
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </div>
  );
};
