const navigationReducer = (state = "home", action) => {
  switch (action.type) {
    case "HOME":
      return "HOME";
    case "EXPLORE":
      return "EXPLORE";
    case "MINE":
      return "MINE";
    case "ABOUT":
      return "ABOUT";
    case "RESUME":
      return "RESUME";

    default:
      console.log(state);
      return state;
  }
};

export default navigationReducer;
