import React from "react";
import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
          {errors.email && "Email is required"}
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
          {errors.password?.type === "pattern" && "패스워드 형식이 틀림"}
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
