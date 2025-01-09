import React from 'react'

export default function Modal({product}) {
  return (
    <div>
        <div className='flex gap-6'>
      <div className='space-y-6'>
        <h4 className='text-2xl font-bold'>{product.name}</h4>
        <img src={product.image} className='w-full h-full object-cover' alt='apple-phone'/>
      </div>
      <div className='space-y-6'>
        <h4 className='text-2xl font-bold'>Thông số</h4>
          <div className='space-y-8'>
            <div className='space-x-24 flex items-center'>
                <p>Name</p>
                <p>{product.name}</p>
            </div>
            <div className='space-x-24 flex items-center'>
            <p>Alias</p>
            <p>{product.alias}</p>
            </div>
            <div className='space-x-24 flex items-center'>
            <p>Price</p>
            <p>{product.price}</p>
            </div>
            <div className='space-x-24 flex items-center'>
            <p>Description</p>
            <p>{product.description}</p>
            </div>
            <div className='space-x-24 flex items-center'>
            <p>ShortDescription</p>
            <p>{product.shortDescription}</p>
            </div>
            <div className='space-x-24 flex items-center'>
            <p>Quantity</p>
            <p>{product.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
