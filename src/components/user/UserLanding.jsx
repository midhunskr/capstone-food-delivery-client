import React from 'react'
import { ItemScroller } from './restaurant/ItemScroller'
import { RestaurantListing } from './restaurant/RestaurantListing'
import { CuisineListing } from './restaurant/CuisineListing'

export const UserLanding = () => {
  return (
    <div className='w-100'>
      <div className='bg-bg-white text-dark'>
        <div className='xr:w-'>
          <ItemScroller />
        </div>
        <RestaurantListing />
        <CuisineListing />
      </div>
    </div>
  )
}
