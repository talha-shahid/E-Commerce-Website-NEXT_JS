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

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {
  console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const reff = useRef();

  const showCart = () => {
    console.log(reff.current);
    reff.current.classList.remove("translate-x-full");
    reff.current.classList.add("translate-x-0");
  };

  const removeCart = () => {
    reff.current.classList.add("translate-x-full");
    reff.current.classList.remove("translate-x-0");
  };

  return (
    <div className="flex justify-center items-center flex-col md:flex-row md:justify-start pt-2 pb-1 shadow-md">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image
            className="cursor-pointer"
            height={70}
            width={70}
            src="/logo.png"
          />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-xl">
          <Link href={"/tshirts"}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoddies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li>Stickers</li>
            </a>
          </Link>
        </ul>
      </div>
      <div onClick={showCart} className="cart absolute top-6 right-0 mx-5">
        <AiOutlineShoppingCart className="text-4xl cursor-pointer" />
      </div>

      <div
        ref={reff}
        className="sideCart absolute top-0 right-0 bg-pink-100 p-10 transform transition-transform translate-x-full z-10"
      >
        <h2 className="font-bold text-xl text-center">
          This is my shopping cart
        </h2>
        <span
          onClick={removeCart}
          className="absolute top-2 right-2 cursor-pointer text-xl text-pink-500"
        > 
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal p-4">
          {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex mt-3 mx-3">
              <div className="w-2/3 font-semibold ">{cart[k]}</div>
              <div className="w-1/3 font-semibold flex items-center justify-center text-lg">
                <AiFillMinusCircle className="text-pink-500 cursor-pointer" />
                <span className="mx-2 text-base">3</span>
                <AiFillPlusCircle className="text-pink-500 cursor-pointer" />
              </div>
            </div>
          </li>})}
        </ol>
        <div className="flex">
          <button className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg mr-2">
            <BsFillBagCheckFill className="m-1" />
            Checkout
          </button>

          <button onClick={clearCart} className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg mr-2">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
