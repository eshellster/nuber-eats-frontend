/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurants
// ====================================================

export interface myRestaurants_myRestaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurants_myRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string | null;
  category: myRestaurants_myRestaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: myRestaurants_myRestaurants_results[] | null;
}

export interface myRestaurants {
  myRestaurants: myRestaurants_myRestaurants;
}

export interface myRestaurantsVariables {
  input: MyRestaurantsInput;
}
