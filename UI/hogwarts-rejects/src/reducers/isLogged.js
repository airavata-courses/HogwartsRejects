
const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return action.payload;
    case "SIGN_OUT":
      return false;
    default:
      return state;
  }
};
export default loggedReducer;
