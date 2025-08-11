import { useState } from 'react';
import test from '../../assets/test_img.jpg'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";
import { GiScreenImpact } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";




function DetailCard() {

    const stockNum = 20

    const [isOpen, setIsOpen] = useState(false);

    const [counter, setCounter] = useState(1)

    const increment = () => {
        setCounter(prev => (prev < stockNum ? prev + 1 : prev))
    }

    const decrement = () => {
        setCounter(prev => (prev > 1 ? prev - 1 : prev))
    }

    let stock = "In stock"

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<i key={i} className="fas fa-star" style={{ color: "gold" }}></i>);
            } else if (rating >= i - 0.5) {
                stars.push(<i key={i} className="fas fa-star-half-alt" style={{ color: "gold" }}></i>);
            } else {
                stars.push(<i key={i} className="far fa-star" style={{ color: "gold" }}></i>);
            }
        }
        return stars;
    };


    return (
        <>
            <div className='xl:flex mt-4'>
                <div className='relative xl:w-1/2'>
                    <div className='bg-primary xl:w-[9%] md:w-[10%] sm:w-[12%] w-[22%] top-3 left-3 absolute rounded-2xl text-center py-1 px-2 text-white font-semibold z-10'>19 LE</div>
                    <figure><img className='w-full' src={test} alt="" /></figure>
                </div>
                <div className='xl:w-1/2 '>
                    <div className='flex gap-2 items-center justify-center sm:justify-start'>
                        <FaLeaf className='text-primary text-[24px]' />
                        <h6 className='font-bold text-[22px]'>HealthyHive</h6>
                    </div>
                    <div className='border-b-1  pb-4'>
                        <h1 className='font-semibold text-[24px] mt-2 sm:text-[36px] sm:mt-0 pt-1 pb-3 mb-2'>Name of Product</h1>
                        <p className='text-xs sm:text-base'>description and Ingredients description and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredientsdescription and Ingredients</p>
                        <div className='flex xl:gap-6 justify-between xl:justify-start mt-4'>
                            <div className='flex gap-2'>
                                <div>{renderStars(4)}</div>
                                <p className='text-recommended-rating font-semibold'>4.4</p>
                            </div>
                            <p className='text-recommended-rating font-semibold sm:mr-2'>SKU: <span className='text-black'>S5T6U7V8</span></p>
                        </div>
                    </div>
                    <div className="max-h-[25%] mb-2 border rounded-lg overflow-hidden mt-2">
                        {/* Accordion Title */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full text-left font-bold sm:text-base text-[14px] bg-[#b8b8b82a] px-4 py-2 rounded-lg flex justify-between items-center"
                        >
                            Nutritional Information
                            <span
                                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {/* Accordion Content */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="px-4 py-3">
                                <div className="flex gap-2 border-b border-gray-400 pb-3 mb-3">
                                    <p className="sm:text-base text-[14px] font-semibold text-detail-info-gray">
                                        Calories :
                                    </p>
                                    <p className="text-detail-info-black font-bold">100</p>
                                </div>
                                <div className="flex gap-2 mb-3">
                                    <p className="sm:text-base text-[14px] font-semibold text-detail-info-gray">
                                        Protein :
                                    </p>
                                    <p className="text-detail-info-black font-bold">6g</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-4'>
                                <p className='text-detail-price-green font-semibold sm:text-[38px]'>27.99 LE</p>
                                <p className='text-recommended-price-gray font-semibold sm:text-[34px] line-through'>34.19 LE</p>
                            </div>
                            <p className={`sm:text-[20px] font-medium mr-2 ${stock === "In stock" ? "text-primary" : "text-red-800"}`}>In Stock</p>
                        </div>
                        <div className='flex items-center sm:gap-4 gap-2 sm:mb-8 mb-4 border-b-1 pb-4'>
                            <p className='xl:text-[24px] sm:text-base font-semibold mt-2 text-[10px]'>Shop now and enjoy the lowest price before it’s gone</p>
                            <GiScreenImpact className='text-yellow-500 sm:scale-150 text-[16px] mt-1' />
                        </div>
                    </div>

                    <div>
                        <div className='flex xl:gap-8 sm:justify-between items-center flex-col sm:flex-row'>
                            <div className='bg-gray-200 sm:py-3 py-1.5 flex justify-center items-center gap-7 sm:w-[28%] md:w-[22%] w-[70%] rounded-4xl'>
                                <FaMinus className='cursor-pointer font-bold' onClick={decrement} />
                                <p className='w-5 text-center scale-130 font-bold'>{counter}</p>
                                <FaPlus className='cursor-pointer font-bold' onClick={increment} />
                            </div>
                            <div className='flex items-center gap-2 justify-between mt-3 sm:mt-0'>
                                <p className='sm:text-[18px] text-xs text-black font-medium'>Only <span className='font-semibold text-primary'>{stockNum} items</span> Left!</p>
                                <div className='flex items-center sm:gap-4 gap-2'>
                                    <p className='sm:text-[18px] text-xs text-black font-medium'>Don't miss it</p>
                                    <FaFaceGrinStars className='sm:scale-125 text-primary' />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 mt-8 sm:justify-center xl:justify-start mb-4'>
                            <button className='bg-detail-btn-green hover:bg-detail-btn-green-hover transition-all rounded-4xl w-54 py-3 cursor-pointer text-white font-bold'>Buy Now</button>
                            <button className='border-1 bg-transparent hover:bg-detail-btn-green-hover hover:text-white  transition-all rounded-4xl cursor-pointer w-54 py-2.5 font-bold'>Add To Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DetailCard