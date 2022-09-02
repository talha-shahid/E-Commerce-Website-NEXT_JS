import { React, useEffect } from "react";
import mongoose from "mongoose";
import Order from "../models/Order";
import { useRouter } from "next/router";

const orders = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500">
      <div className="container mx-auto">
        <h1 className="text-center p-6 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-b from-pink-700 via-pink-600 to-pink-500 drop-shadow-md">
          My Orders
        </h1>
      </div>

      <div class="overflow-x-auto relative pb-10">
        <table class="w-5/6 text-sm text-left text-white mx-auto border border-black shadow-md shadow-pink-900">
          <thead class="text-xs text-white uppercase bg-pink-800 border border-black">
            <tr>
              <th scope="col" class="py-3 px-6">
                Product name
              </th>
              <th scope="col" class="py-3 px-6">
                Color
              </th>
              <th scope="col" class="py-3 px-6">
                Category
              </th>
              <th scope="col" class="py-3 px-6">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-pink-700 dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="py-4 px-6">Sliver</td>
              <td class="py-4 px-6">Laptop</td>
              <td class="py-4 px-6">$2999</td>
            </tr>
            <tr class="bg-pink-700 border-b dark:border-gray-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="py-4 px-6">White</td>
              <td class="py-4 px-6">Laptop PC</td>
              <td class="py-4 px-6">$1999</td>
            </tr>
            <tr class="bg-pink-700">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="py-4 px-6">Black</td>
              <td class="py-4 px-6">Accessories</td>
              <td class="py-4 px-6">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({});

  let colorSizeSlug = {};

  // console.log(tshirts)
  return {
    props: {
      orders: orders,
    }, // will be passed to the page component as props
  };
}

export default orders;
