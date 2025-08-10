import React from 'react'
import RecommendedCard from './RecommendedCard/RecommendedCard'

function RecommendedProducts() {
    return (
        <>
        <h2 className='subTitle ml-20'>Recommended</h2>
        <div className='flex justify-between flex-wrap shrink gap-4 '>
            
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
            <RecommendedCard />
        </div>
        </>
    )
}

export default RecommendedProducts