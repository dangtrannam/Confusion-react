import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { actionTypes } from "react-redux-form";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  },
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "dishes")
    .then((respone) => respone.json())
    .then((dishes) => dispatch(addDishes(dishes)));
};

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then((respone) => respone.json())
    .then((comments) => dispatch(addComments(comments)));
};

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "promotions")
    .then((respone) => respone.json())
    .then((promos) => dispatch(addPromos(promos)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishFailed = (errmess) => ({
  type: actionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const commentFailed = (errmess) => ({
  type: actionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: actionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
