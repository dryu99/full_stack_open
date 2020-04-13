import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [highestSelected, setHighestSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  
  const handleRandomClick = () => {
    const randomDigit = Math.floor(Math.random() * 10);
    setSelected(randomDigit % anecdotes.length);
  }

  const handleVoteClick = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);

    if (newPoints[selected] > newPoints[highestSelected]) {
      setHighestSelected(selected);
    }
  }

  return (
    <React.Fragment>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} anecdotePoints={points[selected]}/>
      <button onClick={handleVoteClick}>
        vote
      </button>
      <button onClick={handleRandomClick}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[highestSelected]} anecdotePoints={points[highestSelected]}/>
    </React.Fragment>
  )
}

const Anecdote = ({ anecdote, anecdotePoints }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {anecdotePoints} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)