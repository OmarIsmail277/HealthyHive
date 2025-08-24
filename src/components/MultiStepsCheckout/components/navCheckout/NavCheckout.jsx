
function NavCheckout({ currentStep, onStepChange }) {

    return (
        <>
            <div className="flex items-center justify-between mb-8 mt-4">

                <div onClick={() => onStepChange(1)} className="flex flex-col items-center cursor-pointer">
                    <div className={`lg:w-10 lg:h-10 w-7 h-7 lg:text-base text-sm rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                        1
                    </div>
                    <span className={`mt-2 lg:text-sm text-xs font-medium 
                        ${currentStep >= 1 ? "text-primary" : "text-gray-500"}`}>
                        Login
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-1 ${currentStep > 1 ? "bg-primary" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(2)} className="flex flex-col items-center cursor-pointer">
                    <div className={`lg:w-10 lg:h-10 w-7 h-7 lg:text-base text-sm rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                        2
                    </div>
                    <span className={`mt-2 lg:text-sm text-xs font-medium ${currentStep >= 2 ? "text-primary" : "text-gray-500"}`}>
                        Billing
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-1 ${currentStep > 2 ? "bg-primary" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(3)} className="flex flex-col items-center cursor-pointer">
                    <div className={`lg:w-10 lg:h-10 w-7 h-7 lg:text-base text-sm rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`} >
                        3
                    </div>
                    <span className={`mt-2 lg:text-sm text-xs font-medium ${currentStep >= 3 ? "text-primary" : "text-gray-500"}`} >
                        Order
                    </span>
                </div>

                <div className={`flex-1 h-1 mx-1 ${currentStep > 3 ? "bg-primary" : "bg-gray-200"}`}></div>

                <div onClick={() => onStepChange(4)} className="flex flex-col items-center cursor-pointer" >
                    <div className={`lg:w-10 lg:h-10 w-7 h-7 lg:text-base text-sm rounded-full flex items-center justify-center font-bold shadow 
                        ${currentStep >= 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                        4
                    </div>
                    <span className={`mt-2 lg:text-sm text-xs font-medium ${currentStep >= 4 ? "text-primary" : "text-gray-500"}`}>
                        Payment
                    </span>
                </div>
            </div>
        </>
    )
}

export default NavCheckout