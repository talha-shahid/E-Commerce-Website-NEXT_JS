import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { TiTickOutline } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//localhost:3000/product/dfgdfgfgd ==> dfgdfgfgd is {slug}

const Slug = ({ addToCart, product, variants, buyNow }) => {
  // console.log("product: ");
  // console.log(product)

  // console.log("variants: ");
  // console.log(variants)

  const router = useRouter();
  const reff = useRef();
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState(null);

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  //=======> FUNCTIONS

  // Check Service
  const checkService = async () => {
    // toast("Checking your pincode");
    let pins = await fetch(`${process.env.HOST}/api/pincode`);
    let pinJson = await pins.json();
    // console.log(pinJson)
    // console.log(typeof pinJson[0])
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success('Pincode serviceable', {
        position: "top-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      setService(false);
      toast.error('Sorry, pincode not serviceable', {
        position: "top-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    // console.log(service)
  };

  //On Change Pin
  const onChangePin = (e) => {
    // console.log("pin set")
    setPin(e.target.value);
    // console.log(pin)
  };

  // Refresh Variant
  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };

  return (
    <>
      {/* The slug is: {slug} */}
      <section className="text-gray-600 body-font overflow-hidden bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500">
        <ToastContainer
          position="top-right"
          autoClose={100}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
        />
        <div className="container py-20 mx-auto bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 my-10 rounded-2xl px-10 lg:px-0 shadow-lg shadow-pink-900">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="shadow-lg lg:w-1/2 w-full h-full sm:h-80 md:h-96 object-cover object-center rounded shadow-pink-900"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex items-center flex-col">
              <h2 className="text-sm title-font text-gray-300 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-300 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed text-white">{product.desc}</p>
              <div className="flex mt-6 items-center justify-center pb-5 border-b-2 border-gray-100 mb-5 w-full">
                <div className="flex">
                  <span className="mr-3 text-white">Color</span>
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "red");
                        }}
                        className={`border-2 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "blue");
                        }}
                        className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "black");
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "green");
                        }}
                        className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("orange") &&
                    Object.keys(variants["orange"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "orange");
                        }}
                        className={`border-2 ml-1 bg-orange-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "orange"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3 text-white">Size</span>
                  <div className="relative ">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10 z-0 border-pink-800"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>SM</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <button
                  onClick={() => {
                    buyNow(slug, 1, 49, product.title, size, color);
                  }}
                  className="flex ml-8 text-white bg-pink-700 shadow-md shadow-pink-900 border py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-800 rounded border-pink-800"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(slug, 1, 49, product.title, size, color);
                    reff.current.classList.add("block");
                    reff.current.classList.remove("hidden");
                    setTimeout(() => {
                      reff.current.classList.add("hidden");
                      reff.current.classList.remove("block");
                    }, 900);
                  }}
                  className="flex ml-4 text-white bg-pink-700 shadow-md shadow-pink-900 border px-2 md:px-6 py-2 focus:outline-none hover:bg-pink-800 rounded border-pink-800"
                >
                  Add to cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>

              <div
                ref={reff}
                className="mt-4 bg-green-300 font-semibold border-2 border-green-700 text-green-700 px-4 py-3 rounded-md relative hidden"
                role="alert"
              >
                <TiTickOutline />
                <span className="block sm:inline">
                  Item added to cart successfully
                </span>
              </div>

              <div className="pin mt-6">
                <input
                  onChange={onChangePin}
                  type="text"
                  placeholder="Enter your pincode"
                  className="px-2 border-2 py-2 border-gray-200 shadow-md shadow-pink-900 rounded-md mb-2 md:mb-0"
                />
                <button
                  onClick={checkService}
                  className=" text-white bg-pink-700 shadow-md shadow-pink-900 border py-2 px-6 focus:outline-none hover:bg-pink-800 rounded mx-2 border-pink-800"
                >
                  Check
                </button>
              </div>

              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3 bg-pink-300 border-2 border-red-700 p-2 rounded font-bold">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}

              {service && service != null && (
                <div className="text-green-700 text-sm mt-3 p-2 bg-pink-100 rounded font-bold border-2 border-green-700">
                  Yay! This pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });

  // console.log(variants) //--> {
  //   red: { XL: { slug: 'wear-jhvfdfsfd' }, M: { slug: 'wear-jhvfdfsfdGFD' } },
  //   blue: { M: { slug: 'wear-jhvfdfdsaafsfd' } }
  // }

  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  // console.log(tshirts)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}
export default Slug;
