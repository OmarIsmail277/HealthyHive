import React from 'react'

function BrandsCard({  image }) {
    return (
        <div className="BrandsCard w-[200px] h-[100px] bg-white shadow-lg rounded-lg flex flex-col items-center justify-center p-4 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:bg-white duration-300">
            <div className="logo w-4/5 p-2">
                <img src={image} alt="Brand Logo" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default BrandsCard