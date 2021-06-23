/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CategoryInput {
  page?: number | null;
  limit: number;
  slug: string;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateDishInput {
  name: string;
  price: number;
  description?: string | null;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  restaurantId: number;
}

export interface CreateOrderItemInput {
  dishId: number;
  orderSize: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  coverImg?: string | null;
  address: string;
  categoryName: string;
}

export interface DeleteDishInput {
  dishId: number;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditDishInput {
  name?: string | null;
  price?: number | null;
  soldOut?: boolean | null;
  invisible?: boolean | null;
  description?: string | null;
  options?: DishOptionInputType[] | null;
  dishId: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  id: number;
}

export interface MyRestaurantsInput {
  page?: number | null;
  limit: number;
}

export interface OrderChoiceInputType {
  name: string;
}

export interface OrderItemOptionInputType {
  name: string;
  orderSize: number;
  choices?: OrderChoiceInputType[] | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
  limit: number;
}

export interface SearchRestaurantsInput {
  page?: number | null;
  limit: number;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
