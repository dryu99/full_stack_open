import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  if (action.type === "INIT_ANECDOTES") {
    return action.data;
  } else if (action.type === "VOTE") {
    const id = action.data.id;
    return state.map(a => a.id === id ? action.data : a);
  } else if (action.type === "NEW_ANECDOTE") {
    return [...state, action.data];
  }

  return state;
}

// Action Creators
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObj = { ...anecdote, votes: anecdote.votes + 1 }
    const upatedAnecdote = await anecdoteService.update(anecdote.id, anecdoteObj)

    dispatch({
      type: "VOTE",
      data: upatedAnecdote
    });
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    // write to db
    const newAnecdote = await anecdoteService.create({ content, votes: 0 });

    // write to app state
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export default anecdoteReducer