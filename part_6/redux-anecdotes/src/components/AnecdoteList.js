import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { changeNoticiation } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
    return filteredAnecdotes.sort((a1, a2) => a2.votes - a1.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(changeNoticiation(`you voted "${anecdote.content}"`, 5));
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </React.Fragment>    
  )
}

export default AnecdoteList;