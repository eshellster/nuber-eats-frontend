import { gql } from "@apollo/client";
import React from "react";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailMutation($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(input: $verifyEmailInput) {
      ok
      error
    }
  }
`;

export const ConfrimEmail = () => {
  return <div></div>;
};
