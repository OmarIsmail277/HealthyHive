
import React from 'react'
import { IoIosLogOut, IoIosNotifications } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { MdHelpCenter, MdPayment } from 'react-icons/md'
import { RiArrowRightSLine } from 'react-icons/ri'
import { TbHistory } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'

function ProfileCard() {
  const navigate = useNavigate();
  const handlegotohistory = () => {
    navigate("/history");
  };

  return (

    <div className="profileCard">
      {/* //main dev */}
      <div className="profile w-4/5 xl:w-3/5 m-auto p-12 flex flex-col bg-[#f8faf4] mt-12 rounded-2xl shadow-lg gap-12 ">
        <div className="user_info w-full flex flex-col gap-4 md:flex-row items-center">
          <div className="user_img w-3/9 md:w-1/5 h-1/5 mr-12 ">
            <img src="/images/ProfilePage/profilepic.png" alt="" />
          </div>
          <div className="user_text flex flex-col gap-5">
            <h2 className='text-3xl font-black'>Sophia Bennett</h2>
            <p className='text-text-grey flex flex-wrap'>sophia.bennett@email.com</p>
            <span className='text-primary'>member since jan 2023</span>
          </div>
        </div>
        <div className="options flex flex-col lg:flex-row gap-12">
          {/* account section  */}
          <div className="account flex flex-col w-ful lg:w-1/2 gap-5">
            <h2 className='text-3xl text-center font-black mb-8'>Account</h2>
            {/* History  */}
            <div onClick={handlegotohistory} className="history flex justify-between items-center w-full lg:w-4/5 m-auto p-4 bg-[#f0f4ef] rounded-lg  hover:bg-white transition-colors duration-300  cursor-pointer ">
              <div className='flex items-center gap-4'><div className='text-2xl text-primary bg-[#e7f0ec] p-2 rounded-lg'><TbHistory /></div><p>Order History</p></div>
              <div className="div"> <RiArrowRightSLine className='text-2xl text-primary' /></div>
            </div>
            {/* Payment  */}
            <div className="history flex justify-between items-center w-full lg:w-4/5 m-auto p-4 bg-[#f0f4ef] rounded-lg hover:bg-white transition-colors duration-300  cursor-pointer">
              <div className='flex items-center gap-4'><div className='text-2xl text-primary bg-[#e7f0ec] p-2 rounded-lg'><MdPayment /></div><p>Payment Methods</p></div>
              <div className="div"> <RiArrowRightSLine className='text-2xl text-primary' /></div>
            </div>
            {/* Personal Information  */}
            <div className="history flex justify-between items-center w-full lg:w-4/5 m-auto p-4 bg-[#f0f4ef] rounded-lg hover:bg-white transition-colors duration-300  cursor-pointer">
              <div className='flex items-center gap-4'><div className='text-2xl text-primary bg-[#e7f0ec] p-2 rounded-lg'><IoPersonOutline /></div><p>Personal Information</p></div>
              <div className="div"> <RiArrowRightSLine className='text-2xl text-primary' /></div>
            </div>

          </div>
          {/* sittings section  */}
          <div className="sittings flex flex-col w-full lg:w-1/2 gap-5">
            <h2 className='text-3xl text-center font-black mb-8'>Settings</h2>
            {/* notifications  */}
            <div className="history flex justify-between items-center w-full lg:w-4/5 m-auto p-4 bg-[#f0f4ef] rounded-lg hover:bg-white transition-colors duration-300  cursor-pointer">
              <div className='flex items-center gap-4'><div className='text-2xl text-primary bg-[#e7f0ec] p-2 rounded-lg'><IoIosNotifications /></div><p>Notifications</p></div>
              <div className="div"> <RiArrowRightSLine className='text-2xl text-primary' /></div>
            </div>
            {/* Help Center  */}
            <Link to="/faq">
            <div className="history flex justify-between items-center w-full lg:w-4/5 m-auto p-4 bg-[#f0f4ef] rounded-lg hover:bg-white transition-colors duration-300  cursor-pointer">
              <div className='flex items-center gap-4'><div className='text-2xl text-primary bg-[#e7f0ec] p-2 rounded-lg'><MdHelpCenter /></div><p>Help Center</p></div>
              <div className="div"> <RiArrowRightSLine className='text-2xl text-primary' /></div>
            </div>
            </Link>
            <hr className='mt-3 text-text-grey' />
            <button className=' flex items-center justify-center gap-2 p-4 text-red-600 rounded-lg   m-auto hover:text-red-700 transition-colors duration-300  outline-none'>
              <IoIosLogOut /> Log Out
            </button>

          </div>
        </div>
      </div>
    </div>)
}

export default ProfileCard