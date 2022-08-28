import React, { useRef } from "react";
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

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subtotal}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const reff = useRef();

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
    <div className="flex justify-center items-center flex-col md:flex-row md:justify-start pt-2 pb-1 sticky top-0 shadow-lg bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 z-50 ">
      <div className="logo mx-5">
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

      <div className="account absolute top-6 right-10 md:right-14 mx-2 md:mx-5 bg-white rounded-full p-1 hover:bg-neutral-200">
        <Link href={'/login'}><a><MdAccountCircle className="text-2xl md:text-4xl cursor-pointer" /></a></Link>
      </div>

      <div onClick={showCart} className="cart absolute top-6 right-0 mx-2 md:mx-5 bg-white rounded-full p-1 hover:bg-neutral-200">
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
