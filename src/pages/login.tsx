/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationSchema } from "../yup/vaidationSchema";
import { gql, useMutation } from "@apollo/client";
import noberLogo from "../images/logo.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

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
    formState: { errors, isValid, isDirty },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(ValidationSchema),
    mode: "onTouched",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
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

  useEffect(() => {
    console.log("isDirty", isDirty);
  }, [isDirty]);

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-32">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={noberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
        >
          <div
            className={`relative my-4 border-b-2 ${
              errors.email?.message
                ? "border-red-500"
                : "focus-within:border-blue-500"
            }`}
          >
            <input
              {...register("email")}
              name="email"
              placeholder=" "
              className="block w-full appearance-none focus:outline-none bg-transparent"
            />
            <label
              htmlFor="username"
              className="absolute top-0 -z-1 duration-300 origin-0 text-gray-400"
            >
              이메일
            </label>
            <div className="absolute font-medium text-sm text-gray-400">
              {errors.email?.message}
            </div>
          </div>
          <div
            className={`relative my-4 border-b-2 ${
              errors.password?.message
                ? "border-red-500"
                : "focus-within:border-blue-500"
            }`}
          >
            <input
              {...register("password")}
              name="password"
              placeholder=" "
              className="block w-full appearance-none focus:outline-none bg-transparent"
            />
            <label
              htmlFor="password"
              className="absolute top-0 -z-1 duration-300 origin-0 text-gray-400"
            >
              패스워드
            </label>
            <div className="absolute font-medium text-sm text-gray-400">
              {errors.password?.message}
            </div>
          </div>
          <Button canClick={true} loading={loading} actionText={"Log in"} />
          <span className="font-medium text-red-500 mb-4">
            {loginMutationResult?.login.error}
          </span>
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-700 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
