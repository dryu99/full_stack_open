import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNoticiation } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    // write to db
    const newAnecdote = await anecdoteService.create({ content, votes: 0 });
    
    // after successful write, add new data to current application state
    dispatch(createAnecdote(newAnecdote));
    dispatch(changeNoticiation(`added new anecdote "${content}"`));
    setTimeout(() => {
      dispatch(changeNoticiation(''));  
    }, 5000)
  
  }

  return (
    <React.Fragment>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </React.Fragment>    
  )
}

export default AnecdoteForm;