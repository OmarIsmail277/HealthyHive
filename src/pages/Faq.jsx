import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FAQPage from '../components/Faq/FaqComponent'
import AdviceFetch from '../components/FetchAdvice/AdviceFetch';
import SubIcon from '../components/SubIcon/SubIcon';

function Faq() {
  return (
    <div>
      <Navbar/>
      <FAQPage/>
      <Footer/>
          <AdviceFetch/>
    <SubIcon/>
    </div>
  )
}

export default Faq