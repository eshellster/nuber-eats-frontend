/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "../yup/loginVaidationSchema";
import { gql, useMutation } from "@apollo/client";
import noberLogo from "../images/logo.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

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
    formState: { errors, isValid },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(LoginValidationSchema),
    mode: "onChange",
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
          <Button canClick={isValid} loading={loading} actionText={"Log in"} />
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
