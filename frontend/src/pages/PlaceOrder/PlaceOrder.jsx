import React, { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2 // Fix here
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error")
    }
  }

  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className='place-order-left'>
          <p className='title'>Delivery information</p>
          <div className='multi-fields'>
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name'></input>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='last name'></input>
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='enter your email'></input>
          <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='street'></input>

          <div className='multi-fields'>
            <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='city'></input>
            <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='state'></input>
          </div>
          <div className='multi-fields'>
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='number' placeholder='zip code'></input>
            <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='country'></input>
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type='enum' placeholder='phone'></input>
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
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder
