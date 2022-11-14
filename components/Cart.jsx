import React ,{useRef} from 'react';
import Link from 'next/link';
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast, { Toaster } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../Lib/client';
import getStripe from '../Lib/getStripe';
import { redirect } from 'next/dist/server/api-utils';
const Cart = () => {
  const cartRef =useRef();
  const {totalPrice,totalQuantity,cartItems,setShowCart,toggleCartItemQuantity,onRemove} =useStateContext();
  const handelCheckOut = async ()=>{
    const stripe = await getStripe();
    const response  = await fetch('/api/stripe',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(cartItems),
    });
    if(response.statusCode === 500) return;
    const data = await response.json();
    // console.log(data,"^^^^^^^^^^^^^^aa");
    // console.log(response.statusCode,"%%%%%%^^^^aa");
    toast.loading('Redirecting...');
    // console.log(response.statusCode,"%%%%%%^^^^aa");
    // window.open(data.url, '_bla/nk', 'noopener,noreferrer');
  
    window.location.replace(data.url);
    // stripe.redirectToCheckout({sessionId:data.id});
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'
      >
        <button type='buttom' className='cart-heading' onClick={()=>setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>your cart</span>
          <span className='cart-num-items'>({totalQuantity} items) </span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={158}/>
            <h3>Your Shopping bag is empty   &#x1F622;  </h3>
            <Link href='/'>
              <button type='button' onClick={()=>setShowCart(false)}
              className='btn' >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {
            cartItems.length >= 1 && cartItems.map((item)=>(
              <div className="product" key={item._id}>
                  <img src={urlFor(item?.image[0])} className='cart-product-image' />
                  <div className='item-desc'>
                    <div className='flex top'>
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom" >
                      <div>
                      <p className='quantity-desc'>
                      <span className='minus' onClick={()=>toggleCartItemQuantity(item._id,'dec')}><AiOutlineMinus /></span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={()=>toggleCartItemQuantity(item._id,'inc')}><AiOutlinePlus /></span>
                      </p>
                      </div>
                      <button type='button' className='remove-item' onClick={()=>onRemove(item)}>
                        <TiDeleteOutline/>
                      </button>
                    </div>
                  </div>
              </div>
            ))
          }
        </div>
        { cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn' onClick={()=>handelCheckOut()}>PAY WITH Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
