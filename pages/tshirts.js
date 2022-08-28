import React from 'react'
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from 'mongoose'



const Tshirts = ({products}) => {
  // console.pllog(products)
  // console.log(Object.keys(products)); //---> ['0', '1', '2', '3']
  return (
    <div>
      <section className="text-gray-600 body-font bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center ">
      {Object.keys(products).map((item)=>{
        // {console.log(item)}
        return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
        <div className="lg:w-1/6 md:w-1/4 p-4 w-full cursor-pointer m-2 bg-gradient-to-b from-pink-800 via-pink-700 to-pink-500 rounded-md shadow-md shadow-pink-900 hover:shadow-sky-900 hover:shadow-lg border border-neutral-700">
          <a className="block relative h-48 rounded overflow-hidden ">
            <img alt="ecommerce" className="m-auto md:h-[30vh] h-[36vh] block shadow-xl shadow-rose-900" src={products[item].img}/>
          </a>
          <div className="mt-4 text-center">
            <h3 className="text-white text-xs tracking-widest title-font mb-1">Tshirt</h3>
            <h2 className="text-white title-font text-lg font-medium">{products[item].title}</h2>
            <p className="mt-1 text-white">{products[item].price}</p>
            <div className="mt-1">
              {products[item].size.includes("S") && <span className='bg-gray-200 rounded px-1 mx-1'>S</span>}
              {products[item].size.includes("M") && <span className=' bg-gray-200 rounded px-1 mx-1'>M</span>}
              {products[item].size.includes("L") && <span className=' bg-gray-200 rounded px-1 mx-1'>L</span>}
              {products[item].size.includes("XL") && <span className='bg-gray-200 rounded px-1 mx-1'>XL</span>}
              {products[item].size.includes("XXL") && <span className='bg-gray-200 rounded px-1 mx-1'>XXL</span>}
            </div>
            <div className="mt-1">
              {products[item].color.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes("blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes("black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes("green") && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
              {products[item].color.includes("orange") && <button className="border-2 border-gray-300 ml-1 bg-orange-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            </div>
          </div>
        </div>
        </Link>
      })}

    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
}
let products = await Product.find({category: 't-shirt'});

let tshirts = {}
for(let item of products){
    // item //--> object
    if(item.title in tshirts){
        if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
            tshirts[item.title].color.push(item.color)
        }
        if(!tshirts[item.title].size.includes(item.size) && item.availableQty>0){
            tshirts[item.title].size.push(item.size)
        }
    }
    else{
        // key is 'products[item].title' and the value is whole 'item' 
        tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0){
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
    }
    // console.log(tshirts)
}
// console.log(tshirts)
  return {
    props: {products: JSON.parse(JSON.stringify(tshirts))}, // will be passed to the page component as props
  }
}

export default Tshirts