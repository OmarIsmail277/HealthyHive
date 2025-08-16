
function NavCheckout({ currentStep, onStepChange }) {

    return (
        <>
            <div className="flex items-center justify-between mb-8 mt-4">

                <div onClick={() => onStepChange(1)} className="flex flex-col items-center cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 1 ? "bg-button text-white" : "bg-gray-200 text-gray-500"}`}>
                        1
                    </div>
                    <span className={`mt-2 text-sm font-medium 
                        ${currentStep >= 1 ? "text-green-500" : "text-gray-500"}`}>
                        Login
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${currentStep > 1 ? "bg-green-500" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(2)} className="flex flex-col items-center cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 2 ? "bg-button text-white" : "bg-gray-200 text-gray-500"}`}>
                        2
                    </div>
                    <span className={`mt-2 text-sm font-medium ${currentStep >= 2 ? "text-green-500" : "text-gray-500"}`}>
                        Billing
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${currentStep > 2 ? "bg-green-500" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(3)} className="flex flex-col items-center cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 3 ? "bg-button text-white" : "bg-gray-200 text-gray-500"}`} >
                        3
                    </div>
                    <span className={`mt-2 text-sm font-medium ${currentStep >= 3 ? "text-green-500" : "text-gray-500"}`} >
                        Order
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-2 ${currentStep > 3 ? "bg-green-500" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(4)} className="flex flex-col items-center cursor-pointer" >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 4 ? "bg-button text-white" : "bg-gray-200 text-gray-500"}`}>
                        4
                    </div>
                    <span className={`mt-2 text-sm font-medium ${currentStep >= 4 ? "text-green-500" : "text-gray-500"}`}>
                        Payment
                    </span>
                </div>
            </div>
        </>
    )
}

export default NavCheckout