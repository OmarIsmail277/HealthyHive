import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import { toggleCartItem } from "../../store/cartSlice";

export default function ProductDetails({ product }) {


    const ingredients = product?.ingredients.split(",").map(item => item.trim())

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);
    const isInWishlist = wishlist.some((item) => item.id === product?.id);

    const [open, setOpen] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(quantity < product?.stockQuantity ? quantity + 1 : product?.stockQuantity);
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
        <div className="flex items-center justify-center p-2 mb-10 mt-3">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full md:w-4/5 bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 min-[1175px]:grid-cols-2">
                {/*product img*/}
                <div className="relative flex  p-6">
                    <img
                        src={product?.imageURL}
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
                        <div className="relative flex justify-between">
                            <div className='flex gap-2 items-center justify-center sm:justify-start'>
                                <FaLeaf className='text-primary text-[24px]' />
                                <h6 className='font-bold text-[22px]'>HealthyHive</h6>
                            </div>
                            <button
                                onClick={(e) => {
                                    dispatch(toggleWishlistItem(product))
                                }}
                                className="absolute right-4 text-3xl cursor-pointer z-20">
                                <FaHeart
                                    className={`transition-colors duration-300 ${isInWishlist
                                        ? "text-primary hover:text-secondary"
                                        : "text-gray-400 hover:text-emerald-300"
                                        }`} />
                            </button>
                        </div>
                        {/* Title  */}
                        <div className="title flex-col justify-between lg:flex xl:flex-row">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight xl:w-[80%]">{product?.Name}</h1>
                            <div className="bg-detail-price-green rounded-4xl px-3 h-fit w-fit py-1 text-white flex items-center">in stock</div>
                        </div>
                        <div className='flex gap-2'>
                            <div>{renderStars(product?.rating)}</div>
                            <p className='text-recommended-rating font-semibold'>{product?.rating}</p>
                        </div>
                        <p className="text-gray-600 text-md leading-relaxed">
                            {product?.description}.
                        </p>
                        <p className='text-recommended-rating font-semibold sm:mr-2'>SKU: <span className='text-black'>{product?.SKU}</span></p>

                        {/* price */}
                        <p className="text-3xl font-bold flex items-center gap-2">  {product?.price - product?.discount} LE
                            {product?.discount > 0 &&
                                <span className='text-recommended-price-gray ml-2 text-[22px] line-through'>{product?.price} LE</span>} </p>
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
                                    {/* <p className="font-bold text-lg mb-2">Serving Size: 50g</p> */}
                                    <p className="font-bold text-2xl mb-4">Calories {product?.nutritionFacts?.calories}</p>
                                    <ul className="divide-y divide-gray-300 text-gray-800">
                                        <li className="flex justify-between py-2">
                                            <span>Total Fat</span> <span>{product?.nutritionFacts?.fats} g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Protein</span> <span>{product?.nutritionFacts?.protein} g</span>
                                        </li>
                                        <li className="flex justify-between py-2">
                                            <span>Carbohydrates</span> <span>{product?.nutritionFacts?.carbs} g</span>
                                        </li>
                                    </ul>
                                    <p className="font-bold text-2xl mb-3 mt-2">Ingredients</p>
                                    <div className="">
                                        {ingredients?.map((item) => (
                                            <div className="" key={item}>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
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
                        <p>Only <span className='font-semibold text-primary'>{product?.stockQuantity} items</span> Left!</p>
                    </div>

                    {/* buttons*/}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <button
                            className="flex-1 bg-secondary text-white py-4 rounded-2xl font-semibold shadow-md hover:bg-primary transition"
                            onClick={(e) => {
                                dispatch(toggleCartItem(product))
                            }}
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
