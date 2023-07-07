import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [responseData, setResponseData] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:8000/cart/get', { user_id: user.user_id })
      .then((result) => {
        setResponseData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [couponData, setCouponData] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:8000/coupon', { user_id: user.user_id })
      .then((result) => {
        setCouponData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    responseData.forEach((data) => {
      total += data.price;
    });
    setCartTotal(total);
  }, [responseData]);

  const handleCouponSelect = (coupon) => {
    if(coupon===null){
      coupon = 0 ;
    }
    const discountAmount = cartTotal * (coupon.discount / 100);
    setCartTotal(cartTotal - discountAmount);
    setSelectedCoupon(coupon);
  };

  const removeCoupon = () => {
    setSelectedCoupon(null);
    setCartTotal(cartTotal + (cartTotal * selectedCoupon.discount) / 100);
  };

  const emptyCart = () => {
    axios.post('http://localhost:8000/cart/delete', { user_id: user.user_id })
      .then((res) => {
        setResponseData([]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const checkout = () => {
    
    axios.post('http://localhost:8000/checkout',{cust_id:user.user_id,coup_id:selectedCoupon.coup_id,total:cartTotal,prod_ids:responseData,address:user.address})
    .then((res)=>{
        emptyCart()
        axios.post('http://localhost:8000/coupon/removecoupon',{user_id:user.user_id,coup_id:selectedCoupon.coup_id})
        .then((res)=>{
            axios.post('http://localhost:8000/coupon', { user_id: user.user_id })
            .then((result) => {
                setCouponData(result.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err)=>console.log(err))
        console.log(res.data)
    })
    .catch((err)=>console.log(err))
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl font-bold mb-8'>Products</h1>
      <div className='grid grid-cols-3 gap-6'>
        {responseData.map((data) => (
          <div key={data.id} className='bg-gray-100 rounded-md p-4'>
            <img
              src='https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg'
              alt='Product'
              className='w-32 h-32 object-cover rounded-full mx-auto mb-4'
            />
            <h2 className='text-lg font-medium'>{data.prod_name}</h2>
            <p className='text-gray-700 mb-4'>${data.price}</p>
          </div>
        ))}
      </div>
      <h1>Select Coupon</h1>
      <ul className='mt-8'>
        {couponData.map((coupon) => (
            <div>
            <li key={coupon.id} className={`flex items-center justify-between p-4 rounded-md mb-4 ${selectedCoupon && selectedCoupon.id === coupon.id ? 'bg-green-100' : 'bg-gray-100'}`}>
            <div>
                <p className="font-medium text-gray-700">Discount : {coupon.discount}%</p>
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 ease-in-out" onClick={() => handleCouponSelect(coupon)}>Select</button>
            </li>
            </div>)
        )}
        <p>Total : {cartTotal}</p>
        <button className="bg-red-500 text-white m-4 py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out" onClick={()=>emptyCart()}>Empty Cart</button>
        <button className="bg-green-500 text-white m-4 py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 ease-in-out" onClick={()=>checkout()} >Checkout</button>
        <button className="bg-red-500 text-white m-4 py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 ease-in-out" onClick={()=>removeCoupon()}>Remove Coupon</button>
        </ul>
    </div>
  )
}

export default Cart
