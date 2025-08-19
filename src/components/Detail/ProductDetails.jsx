import { motion } from "framer-motion";
import test from '../../assets/test_img.jpg'
import { FaLeaf } from "react-icons/fa";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";


export default function ProductDetails() {
    const [open, setOpen] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

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
        <div className="flex items-center justify-center p-2 my-3">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full md:w-4/5 bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 min-[1175px]:grid-cols-2"
            >
                {/*product img*/}
                <div className="relative flex  p-6">
                    <img
                        src={test}
                        alt="Product"
                        className="w-full  object-cover max-h-[650px] rounded-tl-3xl rounded-bl-3xl"
                    />
                    {/* <span className="absolute top-6 left-6 bg-primary text-white px-4 py-1 rounded-full text-sm tracking-wide">
                        19 LE
                    </span> */}
                </div>

                {/* product details*/}
                <div className="p-10 flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <div className='flex gap-2 items-center justify-center sm:justify-start'>
                            <FaLeaf className='text-primary text-[24px]' />
                            <h6 className='font-bold text-[22px]'>HealthyHive</h6>
                        </div>
                        {/* Title  */}
                        <div className="title flex-col justify-between lg:flex xl:flex-row">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Name of Product</h1>
                            <div className="bg-detail-price-green rounded-4xl px-3 h-fit w-fit py-1 text-white flex items-center">in stock</div>
                        </div>
                        <div className='flex gap-2'>
                            <div>{renderStars(4)}</div>
                            <p className='text-recommended-rating font-semibold'>4.4</p>
                        </div>
                        <p className="text-gray-600 text-md leading-relaxed">
                            rorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className='text-recommended-rating font-semibold sm:mr-2'>SKU: <span className='text-black'>S5T6U7V8</span></p>

                        {/* price */}
                        <p className="text-3xl font-bold flex items-center gap-2">  34.19 LE <span className='text-recommended-price-gray text-lg line-through'>34.19 LE</span> </p>
                        {/* Accordion Nutrition Info */}
                        <div className="border border-secondary rounded-xl">
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-full flex justify-between items-center p-4 font-semibold text-lg"
                            >
                                Nutritional Information
                                <MdKeyboardArrowDown
                                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {open && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="px-5 pb-5"
                                >
                                    <p className="font-bold text-lg mb-2">Serving Size: 50g</p>
                                    <p className="font-bold text-2xl mb-4">Calories 220</p>
                                    <ul className="divide-y divide-gray-300 text-gray-800">
                                        <li className="flex justify-between py-2">
                                            <span>Total Fat</span> <span>8 g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Carbohydrates</span> <span>28 g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Protein</span> <span>10 g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Fiber</span> <span>5 g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Sugars</span> <span>12 g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Calcium</span> <span>15%</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Iron</span> <span>8%</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-3">
                                        * % Daily Value based on a 2,000 calorie diet.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex flex-col min-[485px]:flex-row items-center gap-4 mt-4">

                        <span className="font-bold">Quantity:</span>
                        <div className="flex items-center border border-secondary rounded-xl overflow-hidden">
                            <button
                                onClick={decrease}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                            >
                                <BiMinus size={18} />
                            </button>
                            <span className="px-6 py-2 font-semibold">{quantity}</span>
                            <button
                                onClick={increase}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                            >
                                <BiPlus size={18} />
                            </button>
                        </div>
                        <p>Only <span className='font-semibold text-primary'>10 items</span> Left!</p>
                    </div>

                    {/* buttons*/}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                            className="flex-1 bg-secondary text-white py-4 rounded-2xl font-semibold shadow-md hover:bg-primary transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            className="flex-1 border-2 border-primary py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
