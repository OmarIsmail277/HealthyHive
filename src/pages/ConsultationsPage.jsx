import React from 'react'
import ServiceForm from '../components/Consultations/Consultations'
import AdviceFetch from '../components/FetchAdvice/AdviceFetch';
import SubIcon from '../components/SubIcon/SubIcon';


function ConsultationsPage() {
  return (
    <>
<ServiceForm/>
    <AdviceFetch/>
    <SubIcon/>
    </>
)
}

export default ConsultationsPage