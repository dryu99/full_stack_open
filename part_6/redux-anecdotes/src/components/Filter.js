import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    props.changeFilter(event.target.value);
  }

  const style = {
    marginBottom: 10
  }

   return (
    <div style={style}>
      filter
      <input onChange={handleChange}></input>
    </div>    
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)