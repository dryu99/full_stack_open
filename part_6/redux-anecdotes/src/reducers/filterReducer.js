const filterReducer = (state='', action) => {
  if (action.type === "CHANGE_FILTER") {
    return action.filter;
  }

  return state;
}

export const changeFilter = (filter) => {
  return {
    type: "CHANGE_FILTER",
    filter
  }
}

export default filterReducer;