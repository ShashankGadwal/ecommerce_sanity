import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFirework } from '../Lib/utils';
const success = () => {
    const {setCartItems,setTotalPrice,setTotalQuantity} = useStateContext();
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantity(0);
        runFirework();

    },[]);
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order !</h2>
            <p className='email-msg'> check your email inbox for the receipt.</p>
            <p className='description'>If you have any query, please email</p>
            <a className='email' href='shankheadphone@examplehai.com'>shankheadphone@examplehai.com</a>
            <Link href='/'>
                <button type="button" width="300px" className='btn'>Continue Shopping</button>
            </Link>
        </div>
      
    </div>
  )
}

export default success
