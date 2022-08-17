import React from 'react'
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from 'mongoose'


const Tshirts = ({products}) => {
  // console.log(products)
  console.log(console.log(Object.keys(products)));
  return (
    <div>
      <section className="text-gray-600 body-font bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-500">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center ">
      {Object.keys(products).map((item)=>{
        return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
        <div className="lg:w-1/6 md:w-1/4 p-4 w-full cursor-pointer shadow-lg m-2 bg-white">
          <a className="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" className="m-auto md:h-[30vh] h-[36vh] block" src={products[item].img}/>
          </a>
          <div className="mt-4 text-center">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Tshirt</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
            <p className="mt-1">{products[item].price}</p>
            <div className="mt-1">
              S,
              M,
              L,
              XL,
              XXL</div>
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
        if(!tshirts[item.title].color.includes(products[item].color) && products[item].availableQty>0){
            tshirts[item.title].color.push(products[item].color)
        }
        if(!tshirts[item.title].size.includes(products[item].size) && products[item].availableQty>0){
            tshirts[item.title].size.push(products[item].size)
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
  return {
    props: {products: JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  }
}

export default Tshirts