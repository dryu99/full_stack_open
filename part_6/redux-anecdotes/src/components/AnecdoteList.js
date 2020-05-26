import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { changeNoticiation } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({anecdotes, filter}) => {
  //   const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
  //   return filteredAnecdotes.sort((a1, a2) => a2.votes - a1.votes)
  // })
  // const dispatch = useDispatch()
  const filteredAnecdotes = props.anecdotes.filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()));
  const anecdotesToView =  filteredAnecdotes.sort((a1, a2) => a2.votes - a1.votes)  

  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote);
    props.changeNoticiation(`you voted "${anecdote.content}"`, 5);
  }

  return (
    <React.Fragment>      
      {anecdotesToView.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  changeNoticiation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)