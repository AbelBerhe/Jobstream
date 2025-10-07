import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const ContentPlaceHolder = () => {
  return (
 <div className='skeleton-container'>
    <div className='skeleton-text'></div>
    <div className='skeleton-text'></div>
    <div className='skeleton-text' style={{width:'75%'}}></div>
    <div className='skeleton-text' style={{width:'50%'}}></div>
  </div>
  )
}
