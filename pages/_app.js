import '../styles/globals.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({})
  const [subtotal, setSubtotal] = useState(0)
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState()
  const router = useRouter()



  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
      // console.log("hi")
      try {
        if(localStorage.getItem("cart")){
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
        }
      } catch (error) {
        console.error(error)
        localStorage.clear()
      }
      const token = localStorage.getItem('token')
      if(token){
        setUser({value: token})
        setKey(Math.random())
      }
  }, [router.query])
  
//Logout
  const logout = ()=>{
    localStorage.removeItem("token")
    setUser({value: null})
    setKey(Math.random())
    router.push('/')
  }

// Save Cart
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

// Add To Cart
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

// Remove From Cart
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

// Clear Cart
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }

// Buy Now
  const buyNow = (itemCode, qty, price, name, size, variant)=>{ 
    let newCart = {itemCode: {qty:1, price, name, size, variant}}
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
    
  }

  return <>
        <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
  {key &&<Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}/>}
  <Component  buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal}{...pageProps} /><Footer/></>
}

export default MyApp
