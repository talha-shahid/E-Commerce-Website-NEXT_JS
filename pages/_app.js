import '../styles/globals.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {useState, useEffect} from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  useEffect(() => {
    return () => {
      // console.log("hi")
      try {
        if(localStorage.getItem("cart")){
          setCart(JSON.parse(localStorage.getItem("cart")))
        }
      } catch (error) {
        console.error(error)
        localStorage.clear()
      }
    }
  }, [])
  

  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    // console.log(keys)
    for(let i=0; i<keys.length; i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubtotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    // console.log("itemCode: " + itemCode)
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    }
    console.log(newCart)
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

  return <><Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/><Component  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}{...pageProps} /><Footer/></>
}

export default MyApp
