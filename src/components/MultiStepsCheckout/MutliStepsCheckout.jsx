import { useState } from "react";
import BillingCheckout from './components/billingCheckout/BillingCheckout'
import LoginCheckout from './components/loginCheckout/LoginCheckout'
import NavCheckout from './components/navCheckout/NavCheckout'
import OrderCheckout from './components/orderCheckout/OrderCheckout'
import PaymentCheckout from './components/paymentCheckout/PaymentCheckout'

function MutliStepsCheckout() {

  const [step, setStep] = useState(1); 

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  return (
    <div className='w-[80%] mx-auto my-0 py-12'>
      <div className='w-[45%] bg-[#f8faf4] mx-auto my-0 shadow-lg rounded-xl py-4 px-8'>
        <NavCheckout currentStep={step} onStepChange={setStep}/>

        {step === 1 && <LoginCheckout onNext={handleNext} />}
        {step === 2 && <BillingCheckout onNext={handleNext} />}
        {step === 3 && <OrderCheckout onNext={handleNext} />}
        {step === 4 && <PaymentCheckout />}

      </div>
    </div>
  )
}

export default MutliStepsCheckout