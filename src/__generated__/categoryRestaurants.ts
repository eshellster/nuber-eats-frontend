/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: categoryRestaurants
// ====================================================

export interface categoryRestaurants_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface categoryRestaurants_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string | null;
  category: categoryRestaurants_category_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface categoryRestaurants_category_category {
  __typename: "Category";
  name: string;
  coverImg: string | null;
  slug: string;
}

export interface categoryRestaurants_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: categoryRestaurants_category_restaurants[] | null;
  category: categoryRestaurants_category_category | null;
}

export interface categoryRestaurants {
  category: categoryRestaurants_category;
}

export interface categoryRestaurantsVariables {
  input: CategoryInput;
}
