import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <>
      <form className='place-order'>
        <div className='place-order-left'>
          <p className='title'>Delivery information</p>
          <div className='multi-fields'>
            <input type='text' placeholder='First name'></input>
            <input type='text' placeholder='last name'></input>
          </div>

          <input type='email' placeholder='enter your email'></input>
          <input type='text' placeholder='street'></input>

          <div className='multi-fields'>
            <input type='text' placeholder='city'></input>
            <input type='text' placeholder='state'></input>
          </div>
          <div className='multi-fields'>
            <input type='number' placeholder='zip code'></input>
            <input type='text' placeholder='country'></input>
          </div>
          <input type='enum' placeholder='phone'></input>
        </div>
        <div className='place-order-right'>
        <div className='cart-total'>
            <h2>Cart Total</h2>
            <div>
            <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr></hr>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr></hr>
              <div className='cart-total-details'>
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder