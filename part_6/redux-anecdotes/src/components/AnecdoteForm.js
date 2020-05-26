import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeNoticiation } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    
    props.createAnecdote(content);
    props.changeNoticiation(`added new anecdote "${content}"`, 5);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  createAnecdote,
  changeNoticiation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)