import React from "react";
import { useForm } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("cant create account");
  };
  console.log(errors);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
          />
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" && "이메일형식이 아닙니다."}
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern: /^.*(?=^.{8,50}$)(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/,
            })}
          />
          {errors.password?.type === "required" && "Password is required"}
          {errors.password?.type === "pattern" &&
            "패스워드는 8자 이상의 영문과 특수문자가 조합 됩니다."}
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
