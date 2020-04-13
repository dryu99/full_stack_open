import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const handleGoodClick = () => setGoodCount(goodCount + 1);
  const handleNeutralClick = () => setNeutralCount(neutralCount + 1);
  const handleBadClick = () => setBadCount(badCount + 1);

  const stats = [
    {
      text: 'good',
      count: goodCount,
      handleClick: handleGoodClick
    },
    {
      text: 'neutral',
      count: neutralCount,
      handleClick: handleNeutralClick
    },
    {
      text: 'bad',
      count: badCount,
      handleClick: handleBadClick
    }
  ]

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
      <Button text={stats[0].text} handleClick={stats[0].handleClick} />
      <Button text={stats[1].text} handleClick={stats[1].handleClick} />
      <Button text={stats[2].text} handleClick={stats[2].handleClick} />
    </div>
  )
}

const Statistics = ({ stats }) => {
  if (stats.some(stat => stat.count > 0)) {
    // calculate total count
    const totalCount = stats.reduce(
      (acc, currentStat) => acc + currentStat.count,
      0
    );
    
    // calculate average
    const goodScore = stats[0].count * 1;
    const neutralScore = stats[1].count * 0;
    const badScore = stats[2].count * -1;
    const average = totalCount !== 0 ? (goodScore + neutralScore + badScore) / totalCount : 0;
    
    // calculate positive %
    const positiveFraction = totalCount !== 0 ? stats[0].count / totalCount : 0;
    const positivePercentage = (positiveFraction * 100) + ' %';
    
    return (
      <div>
        <Header text={'Statistics'} />
        <Stat text={stats[0].text} value={stats[0].count} />
        <Stat text={stats[1].text} value={stats[1].count} />
        <Stat text={stats[2].text} value={stats[2].count} />
        <Stat text={"total"} value={totalCount}/>
        <Stat text={"average"} value={average}/>
        <Stat text={"positive"} value={positivePercentage}/>
      </div>
    );
  } else {
    return (
      <div>
        <Header text={'Statistics'} />
        <p>No feedback given</p>
      </div>
    );
  }

  return statsComponent;
}

const Stat = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
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