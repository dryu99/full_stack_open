const notificationReducer = (state='', action) => {
  if (action.type === 'CHANGE_NOTIFICATION') {
    return action.notification
  }
  
  return state
}

let timeoutId = null;

export const changeNoticiation = (notification, secondsInterval) => {
  if (timeoutId !== null) clearTimeout(timeoutId);

  return async (dispatch) => {
    dispatch({
        type: "CHANGE_NOTIFICATION",
        notification
    })

    timeoutId = await setTimeout(() => {
      dispatch({
        type: "CHANGE_NOTIFICATION",
        notification: ''
      });  
    }, secondsInterval * 1000)
  }
}

export default notificationReducer;