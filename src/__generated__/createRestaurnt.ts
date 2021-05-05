/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurnt
// ====================================================

export interface createRestaurnt_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: string | null;
}

export interface createRestaurnt {
  createRestaurant: createRestaurnt_createRestaurant;
}

export interface createRestaurntVariables {
  input: CreateRestaurantInput;
}
