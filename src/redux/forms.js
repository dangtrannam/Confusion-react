import * as ActionTypes from "./ActionTypes";

export const Forms = (
  state = {
    errMess: null,
    feedbacks: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      let feedback = action.payload;
      return { ...state, feedbacks: state.feedbacks.concat(feedback) };
    default:
      return state;
  }
};
