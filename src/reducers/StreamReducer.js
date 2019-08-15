import {
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS
} from "../actions/types";

import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS: {
      //aqui lo que se recibe es un arreglo lo pasamos a un objeto
      //posteriormente lo que tenemos que hacer es tomar todo ese objeto y asignarlo a un nuevo estado
      return { ...state, ..._.mapKeys(action.payload, "id") };
    }
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
