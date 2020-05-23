import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.sort((a1, a2) => a2.votes - a1.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  }

  return (
    <React.Fragment>      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </React.Fragment>    
  )
}

export default AnecdoteList;