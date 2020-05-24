const notificationReducer = (state='', action) => {
  if (action.type === 'CHANGE_NOTIFICATION') {
    return action.notification
  }
  
  return state
}

export const changeNoticiation = (notification, secondsInterval) => {
  return async (dispatch) => {
    dispatch({
        type: "CHANGE_NOTIFICATION",
        notification
    })

    await setTimeout(() => {
      dispatch({
        type: "CHANGE_NOTIFICATION",
        notification: ''
      });  
    }, secondsInterval * 1000)
  }
}

export default notificationReducer;