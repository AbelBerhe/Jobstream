import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const ContentPlaceHolder = () => {
  return (
 <div className='p-3'>
    <div className='job-post-detail-panel-top mb-4'>
      <Skeleton width={180} height={25} className="mb-2" /> 
      <Skeleton width={120} height={18} className="mb-1" /> 
      <Skeleton width={100} height={18} className="mb-1" /> 
    </div>
    <hr />
    <div className='job-post-detail-panel-content mb-4'>
      <Skeleton width="80%" height={60} className="mb-3" /> 
      <Skeleton width="60%" height={40} /> 
    </div>
  </div>
  )
}
