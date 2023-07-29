import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast' 
// "toast" is used for Pop-up notification for add, remove, or finish order

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    function onAdd (product, quantity) { // Function for adding items in cart
        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity))
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        
        const checkProductInCart = cartItems.find((item)=> item.id === product._id) // First to check if the product is already in the cart.

        if(checkProductInCart) { // if product we want to add is already present in the cart 
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, // Product will not change
                    quantity: cartProduct.quantity + quantity // Only the quantity is updated whether add/remove
                } 
            })

            setCartItems(updatedCartItems)
        }// Above code is for same product already present in the cart, and we want to add/remove the same item. 
        
        else { // This code is for new product to be added to cart
            product.quantity = quantity // quantity updated
            
            setCartItems([...cartItems, { ...product }]) // product also updated
        }

        toast.success(`${qty} ${product.name} added to the cart.`) // Success message
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id)     

        setTotalPrice((prevTotalPrice) => (prevTotalPrice - foundProduct.price) * foundProduct.quantity)
        setTotalQuantities((prevTotalQuantities) => (prevTotalQuantities - foundProduct.quantity))
        setCartItems(newCartItems)
    }
      
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)     
      
        if (value === 'inc') {
          setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec') {
          if (foundProduct.quantity > 1) {    
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
          }
        }
      };
    
    function incQty() {
        setQty((prevQty) => prevQty + 1)
    } 
    function decQty() {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1

            return prevQty - 1
        })
    } 

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice, 
                setTotalPrice, 
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty, 
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)