import {
    SET_ERRORS,
    SHOW_LOADER,
    SET_IMAGES,
    CLEAR_ERRORS
  } from "../types";
  import axios from "axios";

  export const getImages = (pageNumber) => dispatch => {
    dispatch({ type: SHOW_LOADER });
    console.log("pageNumber", pageNumber)
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNumber}&limit=15`)
      .then(res => {
        dispatch({
            type: SET_IMAGES,
            payload: res.data
        })
        dispatch({ type: CLEAR_ERRORS });

      })
      .catch(err => {
        dispatch({ type: SET_ERRORS, payload: err });
      });
  };