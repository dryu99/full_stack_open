import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const handleGoodClick = () => setGoodCount(goodCount + 1);
  const handleNeutralClick = () => setNeutralCount(neutralCount + 1);
  const handleBadClick = () => setBadCount(badCount + 1);

  const stats = {
    good: {
      text: 'good',
      count: goodCount,
      handleClick: handleGoodClick
    },
    neutral: {
      text: 'neutral',
      count: neutralCount,
      handleClick: handleNeutralClick
    },
    bad: {
      text: 'bad',
      count: badCount,
      handleClick: handleBadClick
    }
  }

  return (
    <React.Fragment>
      <Feedback stats={stats} />
      <Statistics stats={stats} />
    </React.Fragment>
  )
}

const Feedback = ({ stats }) => {  
  return (
    <div>
      <Header text={'Give Feedback'} />
      <Button text={stats.good.text} handleClick={stats.good.handleClick} />
      <Button text={stats.neutral.text} handleClick={stats.neutral.handleClick} />
      <Button text={stats.bad.text} handleClick={stats.bad.handleClick} />
    </div>
  )
}

const Statistics = ({ stats }) => {  
  return (
    <div>
      <Header text={'Statistics'} />
      <Stat text={stats.good.text} count={stats.good.count} />
      <Stat text={stats.neutral.text} count={stats.neutral.count} />
      <Stat text={stats.bad.text} count={stats.bad.count} />
    </div>
  )
}

const Stat = ({ text, count }) => {
  return (
    <p>{text}: {count}</p>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))