import React from "react";
import Link from "next/link";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, subtotal, clearCart, addToCart, removeFromCart }) => {
  console.log(cart)
  return (
    <div className="bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500 pb-10 flex items-center justify-center ">
      <div className="container mt-10 rounded-3xl w-2/3 flex items-center justify-center flex-col bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 pb-10 shadow-lg shadow-pink-900">
        <h1 className="font-bold text-3xl py-8 text-center ml-4 text-white">Check out</h1>
        <h2 className="font-bold text-lg ml-3 text-white ">1. Delivery Details</h2>
        <div className="mx-10 flex my-4 w-3/4 md:w-5/6">
          <div className="px-2 w-1/2">
            <div class="mb-4">
              <label for="name" class="leading-7 text-sm text-white font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div class="mb-4">
              <label for="email" class="leading-7 text-sm text-white font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>
        </div>

        <div className="mx-10 w-3/4 md:w-5/6">
          <div className="w-full">
            <div class="pb-4">
              <label for="address" class="leading-7 text-sm text-white font-semibold">
                Address
              </label>
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="2"
                className="w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-lg shadow-pink-900"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mx-10 flex py-4 w-3/4 md:w-5/6">
          <div className="px-2 w-1/2">
            <div class="pb-4">
              <label for="phone" class="leading-7 text-sm text-white font-semibold">
                Phone
              </label>
              <input
                type="phone"
                id="phone"
                name="phone"
                class=" w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div class="pb-4">
              <label for="city" class="leading-7 text-sm text-white font-semibold">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                class="w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>
        </div>

        <div className=" flex py-4 mx-10 w-3/4 md:w-5/6">
          <div className="px-2 w-1/2">
            <div class="pb-4">
              <label for="state" class="leading-7 text-sm text-white font-semibold">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                class=" w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>

          <div className="px-2 w-1/2">
            <div class="pb-4">
              <label for="pincode" class="leading-7 text-sm text-white font-semibold">
                PinCode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                class="w-full bg-pink-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-0 md:py-1 px-3 leading-8 transition-colors duration-200 ease-in-out shadow-md shadow-pink-900"
              />
            </div>
          </div>
        </div>

        <h2 className="font-bold text-lg pt-2 pb-2 ml-3 text-white">
          2. Review Cart Items
        </h2>

        <div className="sideCart bg-pink-100 py-5 px-10 z-10 mx-10 w-3/4 md:w-5/6 rounded-md shadow-lg shadow-pink-900">
          <ol className="list-decimal p-4">
            {Object.keys(cart).length == 0 && (
              <div className="mt-3">No items in the Cart</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex mt-3 mx-3">
                    <div className="w-2/3 font-semibold ">{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                    <div className="w-1/3 font-semibold flex items-center justify-center text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k],
                            cart[k].name,
                            cart[k].size,
                            cart[k].varaint
                          );
                        }}

                        
                        className="text-pink-500 cursor-pointer text-3xl md:text-2xl"
                      />
                      <span className="mx-2 text-base">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k],
                            cart[k].name,
                            cart[k].size,
                            cart[k].varaint
                          );
                        }}
                        className="text-pink-500 cursor-pointer text-3xl md:text-2xl"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="ml-5 text-lg">
            <b>SubTotal:</b> ${subtotal}
          </div>
        </div>
        <div className="mt-4">
          <Link href={"/checkout"}>
            <button className="flex shadow-md shadow-pink-900 mx-10 text-white bg-pink-700 border-0 py-2 px-8 focus:outline-none hover:bg-pink-800 rounded text-lg ">
              <BsFillBagCheckFill className="m-1" />
              Pay ${subtotal}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
