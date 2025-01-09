import React from 'react'

export default function ({product, onClickViewModal}) {
  return (
    <div>
    <div className='w-full border border-input rounded-lg p-6 space-y-3'>
      <img src={product.image} className='w-full h-[250px] object-cover' alt=''/>
      <h3 className='text-lg font-semibold'>{product.name}</h3>
      <button onClick={()=>onClickViewModal(product)} className='p-3 rounded-lg text-white bg-blue-500'>Xem chi tiết</button>
      <button className='p-3 mx-2 rounded-lg text-white bg-red-500'>Thêm vào giỏ hàng</button>
    </div>
    </div>
  )
}
