/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantsQuery
// ====================================================

export interface searchRestaurantsQuery_searchRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantsQuery_searchRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string | null;
  category: searchRestaurantsQuery_searchRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantsQuery_searchRestaurants {
  __typename: "SearchRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantsQuery_searchRestaurants_restaurants[] | null;
}

export interface searchRestaurantsQuery {
  searchRestaurants: searchRestaurantsQuery_searchRestaurants;
}

export interface searchRestaurantsQueryVariables {
  input: SearchRestaurantsInput;
}
