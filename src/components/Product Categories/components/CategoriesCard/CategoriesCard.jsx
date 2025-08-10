import React from 'react'
import honey from '/images/honey.jpg'
import { useNavigate } from 'react-router-dom';

function CategoriesCard({ category, image, path }) {
    const navigate = useNavigate();
    const handleclick = () => {
        // console.log("View all clicked");
        navigate(path);
    }
    
  return (
    <div className="card w-64 h-80 p-4 m-2 bg-[#f8faf4] shadow-lg rounded-lg flex flex-col gap-4 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:bg-white duration-300">
        <div className="img h-2/3">
            <img src={image} alt="Category" className="w-full h-full object-cover rounded-t-lg " />
        </div>
        <h3 className='text-center text-[#008459] text-lg font-bold'>{category}</h3>
        <button onClick={handleclick} className='bg-[#008459] text-xs p-2 text-white w-fit m-auto rounded hover:bg-[#006f47] transition duration-300'>
            View all
        </button>   
    </div>
  )
}

export default CategoriesCard