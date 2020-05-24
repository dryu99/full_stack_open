import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNoticiation } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.anecdote.value));
    dispatch(changeNoticiation(`added new anecdote "${event.target.anecdote.value}"`));
    setTimeout(() => {
      dispatch(changeNoticiation(''));  
    }, 5000)
    
    event.target.anecdote.value = '';
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