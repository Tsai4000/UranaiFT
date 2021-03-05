import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Test = () => {
  const testState = useSelector(state => state.testStore);
  const dispatch = useDispatch();
  const test = () => {
    dispatch({
      type: 'TEST_STORE',
      payload: 'test ok'
    })
  }
  return (
    <div>
      <button type='button' onClick={test}>click to test</button>
      {testState}
    </div>
  )
}

export default Test;