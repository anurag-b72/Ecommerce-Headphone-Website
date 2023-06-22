import Link from 'next/link'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from '.'
import { useStateContext } from '@/context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantitites } = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/" >AB Headphones</Link>
      </p>

      <button type='button' className='cart-icon' onClick={()=>setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantitites}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar