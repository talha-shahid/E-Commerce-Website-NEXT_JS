import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import {MdAccountCircle} from "react-icons/md"

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subtotal}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const reff = useRef();
  const [dropDown, setDropDown] = useState(false)
  const toggleDropDown= ()=>{
    setDropDown(!dropDown)
  }

  const showCart = () => {
    // console.log(reff.current);
    reff.current.classList.remove("translate-x-full");
    reff.current.classList.add("translate-x-0");
  };

  const removeCart = () => {
    reff.current.classList.add("translate-x-full");
    reff.current.classList.remove("translate-x-0");
  };

  return (
    <div className="flex justify-center items-center flex-col md:flex-row md:justify-start pt-2 pb-1 sticky top-0 shadow-lg bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 z-50  ">
      <div className="logo mx-5 ">
        <Link href={"/"}>
          <Image
            className="cursor-pointer bg-white rounded-full hover:bg-neutral-200"
            height={70}
            width={70}
            src="/logo.png"
          />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-xl">
          <Link href={"/tshirts"}>
            <a className="hover:border-b-2 hover:border-neutral-300">
              <li className="text-2xl font-normal text-white hover:text-neutral-200 ">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoddies"}>
            <a className="hover:border-b-2 hover:border-neutral-300">
              <li className="text-2xl font-normal text-white hover:text-neutral-200">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a className="hover:border-b-2 hover:border-neutral-300">
              <li className=" text-2xl font-normal text-white hover:text-neutral-200 ">Stickers</li>
            </a>
          </Link>
        </ul>
      </div>
        <span onMouseOver={()=>{setDropDown(true)}} onMouseLeave={()=>{setDropDown(false)}}>
        {dropDown && <div className=" absolute right-12 bg-pink-300 top-20 rounded-md p-5 w-36 ">
          <div className=" bg-pink-300 transform w-9 h-6 absolute -mt-1 top-0 rounded-lg  right-5 rotate-45 "></div>
          <ul>
            <Link href={"/myaccount"}><a><li className="font-semibold py-2 hover:text-pink-700 hover:cursor-pointer">My Account</li></a></Link>
            <Link href={"/orders"}><a><li className="font-semibold py-2 hover:text-pink-700 hover:cursor-pointer">Orders</li></a></Link>
            <li onClick={logout} className="font-semibold py-2 hover:text-pink-700 hover:cursor-pointer">Logout</li>
          </ul>
        </div>}

        {user.value && <div className="border border-black cart absolute top-6 right-12 mx-2 md:mx-5 bg-white rounded-full p-2 hover:bg-neutral-200 md:p-1"><MdAccountCircle  className="text-2xl md:text-4xl cursor-pointer" /></div>}
        </span>

        {!user.value && <Link href={'/login'}><a><button className="absolute top-7 md:right-16 bg-white  rounded-xl py-1.5 md:py-1 px-2 md:px-1 md:text-base lg:text-base text-sm drop-shadow-xl border border-black font-semibold md:font-bold hover:bg-neutral-200 right-14 md:mr-2">Login</button></a></Link>}

      <div onClick={showCart} className="border border-black cart absolute top-6 right-0 mx-2 md:mx-5 bg-white rounded-full p-2 hover:bg-neutral-200 md:p-1">
        <AiOutlineShoppingCart className="text-2xl md:text-4xl cursor-pointer" />
      </div>
      
      <div
        ref={reff}
        className="sideCart absolute top-0 right-0 bg-pink-200 shadow-sm shadow-pink-900  p-10 transform transition-transform translate-x-full z-10" //overflow-y-scroll 
      >
        <h2 className="font-bold text-xl text-center">
          Shopping cart
        </h2>
        <span
          onClick={removeCart}
          className="absolute top-2 right-2 cursor-pointer text-xl text-pink-500 drop-shadow-md hover:text-pink-600"
        > 
          <AiFillCloseCircle size={30}/>
        </span>
        <ol className="list-decimal p-4">
          {Object.keys(cart).length==0 && <div className="mt-3">No items in the Cart</div>}
          {Object.keys(cart).map((k)=>{return <li key={k}>
            {/* {console.log(cart)} */}
            <div className="item flex mt-3 mx-3">
              <div className="w-2/3 font-semibold ">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
              <div className="w-1/3 font-semibold flex items-center justify-center text-lg">
                <AiFillMinusCircle size={20} onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k], cart[k].name, cart[k].size, cart[k].varaint)}} className="text-pink-500 cursor-pointer drop-shadow-md hover:text-pink-600" />
                <span className="mx-2 text-base">{cart[k].qty}</span>
                <AiFillPlusCircle size={20} onClick={()=>{addToCart(k, 1, cart[k].price, cart[k], cart[k].name, cart[k].size, cart[k].varaint)}} className="text-pink-500 cursor-pointer drop-shadow-md hover:text-pink-600" />
              </div>
            </div>
          </li>})}
        </ol>

        <div className="ml-5 text-lg">
            <b>SubTotal:</b> ${subtotal}
          </div>

        <div className="flex">
          <Link href={'/checkout'}>
          <button className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg mr-2 shadow-md shadow-pink-900">
            <BsFillBagCheckFill className="m-1" />
            Checkout
          </button>
          </Link>

          <button onClick={clearCart} className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg mr-2 shadow-md shadow-pink-800">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
