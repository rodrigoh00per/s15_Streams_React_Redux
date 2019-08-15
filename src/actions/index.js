import stream from "../apis/streams";
import history from "../history";
import {
  FETCH_STREAMS,
  CREATE_STREAM,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";

export const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  let { userId } = getState().auth; //obtenemos el usuario que esta creando el respectivo stream
  const response = await stream.post("/streams", { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  //vamos a navegar al inicio cuando ya todo este chido

  history.push("/"); //con el push le digo que quiero navegar a esa ruta
};

export const fetchStreams = () => async dispatch => {
  const response = await stream.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await stream.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await stream.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/"); //con el push le digo que quiero navegar a esa ruta
};

export const deleteStream = id => async dispatch => {
  await stream.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
