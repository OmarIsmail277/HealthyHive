import React from 'react'
import CalorieCalculator from '../components/CalorieCalculator/CalorieCalculator'
import AdviceFetch from '../components/FetchAdvice/AdviceFetch';
import SubIcon from '../components/SubIcon/SubIcon';

function Calculator() {
  return (
    <>
<CalorieCalculator/>
    <AdviceFetch/>
    <SubIcon/>
    </>
)
}

export default Calculator