import Navbar from '../components/Navbar/Navbar'
import SubscriptionForm from '../components/SubscriptionForm/SubscriptionForm'
import Footer from '../components/Footer/Footer'
import FloatingSubscription from '../components/SubIcon/SubIcon'
import FetchAdvice from '../components/FetchAdvice/AdviceFetch'
import AdviceFetch from '../components/FetchAdvice/AdviceFetch'

function Subscription() {
  return (
<>

<Navbar/>
<SubscriptionForm/>
<FloatingSubscription/>
<AdviceFetch/>
<Footer/>
</>
)
}

export default Subscription