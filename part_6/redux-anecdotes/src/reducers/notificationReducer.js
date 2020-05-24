const notificationReducer = (state='', action) => {
  if (action.type === 'CHANGE_NOTIFICATION') {
    return action.notification
  }
  
  return state
}

export const changeNoticiation = (notification) => {
  return {
    type: "CHANGE_NOTIFICATION",
    notification
  }
}

export default notificationReducer;