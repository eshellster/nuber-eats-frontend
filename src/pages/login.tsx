import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "../yup/loginVaidationSchema";
import { gql, useMutation } from "@apollo/client";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginFormInput {
  email: string;
  password: string;
  resultError?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(LoginValidationSchema),
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const [preValue, setPreValue] = useState(["", ""]);

  const onSubmit = () => {
    const { email, password } = getValues();

    if (!loading) {
      if (email !== preValue[0] || password !== preValue[1]) {
        loginMutation({
          variables: {
            loginInput: { email, password },
          },
        });
      }
      setPreValue([email, password]);
    }
  };

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
          <button className="btn mt-3">
            {loading ? "loading..." : "Log In"}
          </button>
          <span className="font-medium text-red-500">
            {loginMutationResult?.login.error}
          </span>
        </form>
      </div>
    </div>
  );
};
