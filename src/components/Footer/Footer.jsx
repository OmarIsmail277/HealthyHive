
import React from 'react'
import { FaFacebook, FaLocationDot, FaPhone, FaSquareXTwitter } from 'react-icons/fa6'
import { FiInstagram } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import footerimg from '/images/Footer.jpg';


function Footer() {
    return (
        <div className="footer  bg-no-repeat bg-cover bg-[center_70%] w-full bg-gray-800 text-white pt-12 lg:p-12 pb-12 text-center mt-12"
        style={{ backgroundImage: `url(${footerimg})` }}
        >
            <div className="content flex flex-col w-4/5 m-auto gap-6 lg:flex-row">
                    {/* // About and Contact sections */}
                <div className="info flex flex-col lg:flex-row w-ful text-left items-center gap-12">
                    <div className="about flex flex-col  gap-4 w-full">
                        <h2 className="text-lg font-bold">About Us</h2>
                        <p className="text-sm">We are dedicated to providing the best health and wellness resources,
                            Fuel your energy with a full range of healthy and yummy superfoods which are rich in high nutritional values, for you and everyone in your family, from athletes to children, who look for products from nature and a healthy lifestyle.
                        </p>
                    </div>
                    <div className="contact w-full flex flex-col gap-4">
                        <h2 className="text-lg font-bold">Contact Us</h2>
                        <p className="text-sm flex gap-2"> <span><FaLocationDot className='text-2xl' /></span> Alexandria , Egypt </p>
                        <p className="text-sm flex gap-2"> <span><FaPhone className='text-2xl' /></span> 17002 </p>

                    </div>
                </div>
                {/* // Subscribe and Social sections */}
                <div className="social w-full flex flex-col gap-4 text-left items-start sm:items-start">
                    <div className="subscribe  flex flex-col text-left gap-4 ">
                        <h2 className="text-lg font-bold">Subscribe to our Newsletter</h2>
                        <form className="flex">
                            <input type="email" placeholder="Enter your email" className="w-[80%] p-2 rounded-tl-lg rounded-bl-lg bg-white outline-none " />
                            <button type="submit" className="bg-primary text-white w-fit p-2 rounded-tr-lg rounded-br-lg hover:bg-detail-btn-green cursor-pointer">Subscribe</button>
                        </form>
                    </div>
                    <div className="social-links flex flex-col text-left gap-4 w-full items-start  sm:items-start">
                        <h2>STAY CONNECTED</h2>
                        <div className="icons flex gap-4 text-2xl">
                            <Link to={`https://www.facebook.com/`}>
                                <FaFacebook />
                            </Link>
                            <Link to={`https://www.facebook.com/`}>
                                <FiInstagram />
                            </Link>
                            <Link to={`https://www.facebook.com/`}>
                                <FaSquareXTwitter />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Footer