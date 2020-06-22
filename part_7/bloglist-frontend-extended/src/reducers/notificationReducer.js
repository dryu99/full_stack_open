const initialState = {
  type: null,
  message: ''
};

const notificationReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'CHANGE_NOTIFICATION':
    return action.notification;
  default:
    return state;
  }
};

let timeoutId = null;

export const changeNotification = (message, type, secondsInterval) => {
  if (timeoutId !== null) clearTimeout(timeoutId);

  return async (dispatch) => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      notification: { message, type }
    });

    timeoutId = await setTimeout(() => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        notification: { message: '', type: 'success' }
      });
    }, secondsInterval * 1000);
  };
};

export default notificationReducer;